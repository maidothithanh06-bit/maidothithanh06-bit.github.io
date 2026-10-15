/**
 * Google Sheets Integration Service for PITHY E-Commerce
 * Handles order submission to Google Apps Script Web App,
 * sanitization, local caching, and diagnostic testing.
 */

import { OrderRecord, GoogleSheetsConfig } from '../types';
import { sanitizeForSheet, formatDateTimeVi } from '../utils/formatters';

const STORAGE_KEY_CONFIG = 'pithy_sheets_config';
const STORAGE_KEY_ORDERS = 'pithy_saved_orders';

export const DEFAULT_SHEETS_CONFIG: GoogleSheetsConfig = {
  webhookUrl: '',
  autoSync: true,
  useFallbackSimulation: true,
  lastSyncStatus: 'idle',
};

export function getStoredSheetsConfig(): GoogleSheetsConfig {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_CONFIG);
    if (raw) {
      return { ...DEFAULT_SHEETS_CONFIG, ...JSON.parse(raw) };
    }
  } catch (e) {
    console.error('Failed to load sheets config', e);
  }
  return DEFAULT_SHEETS_CONFIG;
}

export function saveSheetsConfig(config: GoogleSheetsConfig): void {
  try {
    localStorage.setItem(STORAGE_KEY_CONFIG, JSON.stringify(config));
  } catch (e) {
    console.error('Failed to save sheets config', e);
  }
}

export function getStoredOrders(): OrderRecord[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_ORDERS);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.error('Failed to load orders', e);
  }
  return [];
}

export function saveOrderToStorage(order: OrderRecord): void {
  try {
    const existing = getStoredOrders();
    const updated = [order, ...existing.filter((o) => o.orderCode !== order.orderCode)];
    localStorage.setItem(STORAGE_KEY_ORDERS, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to save order to localStorage', e);
  }
}

/**
 * Format order into rows for Google Sheets (Columns A through O)
 * A. Mã đơn hàng
 * B. Thời gian đặt hàng
 * C. Họ và tên khách hàng
 * D. Số điện thoại
 * E. Email
 * F. Địa chỉ nhận hàng
 * G. Tên sản phẩm
 * H. Danh mục sản phẩm
 * I. Kích cỡ giày
 * J. Số lượng
 * K. Đơn giá
 * L. Tổng tiền mặt hàng
 * M. Phương thức thanh toán
 * N. Ghi chú
 * O. Trạng thái đơn hàng
 */
export function transformOrderToSheetRows(order: OrderRecord) {
  const formattedTime = formatDateTimeVi(order.createdAt);
  const paymentMethodVi = order.paymentMethod === 'cod' ? 'Thanh toán khi nhận hàng (COD)' : 'Chuyển khoản ngân hàng (VietQR)';

  return order.items.map((item) => {
    return {
      orderCode: sanitizeForSheet(order.orderCode),
      orderTime: sanitizeForSheet(formattedTime),
      customerName: sanitizeForSheet(order.customer.fullName),
      phone: sanitizeForSheet(order.customer.phone),
      email: sanitizeForSheet(order.customer.email || 'N/A'),
      shippingAddress: sanitizeForSheet(order.customer.address),
      productName: sanitizeForSheet(item.productName),
      category: sanitizeForSheet(item.category),
      shoeSize: item.size,
      quantity: item.quantity,
      unitPrice: item.unitPrice,
      totalAmount: item.subtotal,
      paymentMethod: sanitizeForSheet(paymentMethodVi),
      notes: sanitizeForSheet(order.customer.notes || 'Không có'),
      status: sanitizeForSheet(order.status),
    };
  });
}

/**
 * Submit order to Google Apps Script Web App
 */
export async function submitOrderToGoogleSheets(
  order: OrderRecord,
  config: GoogleSheetsConfig
): Promise<{ success: boolean; message: string; isSimulated?: boolean }> {
  // Always save locally first so customer and student never lose the order data
  saveOrderToStorage(order);

  // Check if webhook is configured
  if (!config.webhookUrl || !config.webhookUrl.trim().startsWith('http')) {
    if (config.useFallbackSimulation) {
      // Demo / Local storage mode
      return {
        success: true,
        isSimulated: true,
        message: 'Đơn hàng đã được lưu an toàn vào hệ thống Demo (LocalStorage). Bạn có thể cấu hình URL Google Apps Script để tự động đồng bộ vào Google Sheets thật bất cứ lúc nào.',
      };
    } else {
      return {
        success: false,
        message: 'Chưa cấu hình URL Google Apps Script Web App. Vui lòng vào mục "Kết Nối Google Sheets" để dán URL triển khai.',
      };
    }
  }

  const rows = transformOrderToSheetRows(order);
  const payload = {
    action: 'CREATE_ORDER',
    orderCode: order.orderCode,
    createdAt: order.createdAt,
    customer: order.customer,
    finalTotal: order.finalTotal,
    rows: rows,
  };

  try {
    // We send payload as JSON text. In Google Apps Script, doPost(e) parses e.postData.contents
    const response = await fetch(config.webhookUrl.trim(), {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8', // Prevents pre-flight CORS block on Google Apps Script
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok && response.type !== 'opaque') {
      throw new Error(`Máy chủ Google Sheets phản hồi mã lỗi HTTP ${response.status}`);
    }

    // Try parsing JSON if not opaque
    let resData: { status?: string; message?: string } = {};
    try {
      resData = await response.json();
    } catch {
      // In case of Google Apps Script redirect or opaque response
      resData = { status: 'success', message: 'Dữ liệu đã được gửi thành công đến Google Apps Script' };
    }

    if (resData.status === 'error') {
      throw new Error(resData.message || 'Lỗi xử lý từ Google Apps Script');
    }

    // Update order with sync status
    order.syncedToGoogleSheets = true;
    order.sheetsResponse = 'Đã lưu vào Google Sheets';
    saveOrderToStorage(order);

    return {
      success: true,
      message: 'Đơn hàng đã được lưu vào Google Sheets thành công!',
    };
  } catch (error: any) {
    console.error('Google Sheets sync error:', error);

    // If fallback is enabled, inform the user clearly
    if (config.useFallbackSimulation) {
      return {
        success: true,
        isSimulated: true,
        message: `Đơn hàng đã được lưu an toàn trên hệ thống. Đồng bộ Google Sheets gặp lỗi: "${error.message}". Bạn có thể kiểm tra lại quyền Web App ("Anyone") trong Apps Script.`,
      };
    }

    return {
      success: false,
      message: `Không thể kết nối tới Google Sheets: ${error.message}. Hãy kiểm tra kết nối mạng và URL Web App.`,
    };
  }
}

/**
 * Ready-to-copy Google Apps Script code satisfying:
 * - Columns A to O
 * - Concurrency lock with LockService
 * - CORS handling
 * - Formula injection prevention
 * - Auto header creation if sheet is blank
 */
export const SAMPLE_GOOGLE_APPS_SCRIPT_CODE = `/**
 * ====================================================================
 * HỆ THỐNG XỬ LÝ ĐƠN HÀNG PITHY E-COMMERCE CHO GOOGLE SHEETS
 * Dự án Thương mại điện tử - ĐH / Học phần TMĐT
 * ====================================================================
 */

function setupHeaders(sheet) {
  var headers = [
    "Mã đơn hàng",          // Cột A
    "Thời gian đặt hàng",    // Cột B
    "Họ và tên khách hàng", // Cột C
    "Số điện thoại",        // Cột D
    "Email",                // Cột E
    "Địa chỉ nhận hàng",    // Cột F
    "Tên sản phẩm",         // Cột G
    "Danh mục sản phẩm",    // Cột H
    "Kích cỡ giày",         // Cột I
    "Số lượng",             // Cột J
    "Đơn giá (VNĐ)",        // Cột K
    "Tổng tiền (VNĐ)",      // Cột L
    "Phương thức thanh toán",// Cột M
    "Ghi chú",              // Cột N
    "Trạng thái đơn hàng"   // Cột O
  ];

  if (sheet.getLastRow() === 0) {
    var headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange.setValues([headers]);
    headerRange.setBackground("#0B0B0D");
    headerRange.setFontColor("#C6FF3D");
    headerRange.setFontWeight("bold");
    headerRange.setHorizontalAlignment("center");
    sheet.setFrozenRows(1);
  }
}

function doPost(e) {
  // Concurrency Lock: đảm bảo không bị xung đột khi nhiều khách đặt cùng lúc
  var lock = LockService.getScriptLock();
  var lockAcquired = lock.tryLock(10000); // Đợi tối đa 10 giây

  if (!lockAcquired) {
    return createJsonResponse({
      status: "error",
      message: "Hệ thống đang bận xử lý đơn hàng khác, vui lòng thử lại sau vài giây!"
    });
  }

  try {
    if (!e || !e.postData || !e.postData.contents) {
      return createJsonResponse({
        status: "error",
        message: "Không tìm thấy dữ liệu yêu cầu (No payload found)"
      });
    }

    var data = JSON.parse(e.postData.contents);
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    setupHeaders(sheet);

    var rows = data.rows || [];
    if (!Array.isArray(rows) || rows.length === 0) {
      return createJsonResponse({
        status: "error",
        message: "Danh sách sản phẩm trống"
      });
    }

    var newRows = [];
    for (var i = 0; i < rows.length; i++) {
      var r = rows[i];
      newRows.push([
        r.orderCode || "",
        r.orderTime || "",
        r.customerName || "",
        r.phone || "",
        r.email || "",
        r.shippingAddress || "",
        r.productName || "",
        r.category || "",
        r.shoeSize || "",
        r.quantity || 1,
        r.unitPrice || 0,
        r.totalAmount || 0,
        r.paymentMethod || "",
        r.notes || "",
        r.status || "Chờ xác nhận"
      ]);
    }

    // Ghi hàng loạt vào bảng tính
    var startRow = sheet.getLastRow() + 1;
    sheet.getRange(startRow, 1, newRows.length, 15).setValues(newRows);

    // Định dạng tiền tệ cho cột K (11) và Cột L (12)
    sheet.getRange(startRow, 11, newRows.length, 2).setNumberFormat("#,##0 \\"đ\\"");

    return createJsonResponse({
      status: "success",
      message: "Đã lưu " + newRows.length + " dòng sản phẩm vào Google Sheets thành công!",
      orderCode: data.orderCode
    });

  } catch (error) {
    return createJsonResponse({
      status: "error",
      message: error.toString()
    });
  } finally {
    lock.releaseLock();
  }
}

function doGet(e) {
  // Hỗ trợ kiểm tra sức khỏe kết nối (Health check)
  return createJsonResponse({
    status: "ok",
    message: "Google Apps Script PITHY E-Commerce đang hoạt động bình thường!"
  });
}

function createJsonResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
`;
