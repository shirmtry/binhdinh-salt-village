/* Làng muối Bình Định 2026 — Vanilla JS — HTK 0396241674 — cập nhật 09/11/2026 */
'use strict';

var STORAGE_KEY = 'htk_salt_village_connections_2026';
var mockData = null;

function $(sel) { return document.querySelector(sel); }

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function formatNumber(n) {
  return Number(n).toLocaleString('vi-VN');
}

/* ---------- Làng muối ---------- */
function renderVillages(villages) {
  var list = $('#village-list');
  list.innerHTML = villages.map(function (v) {
    return (
      '<article class="village-card" id="card-' + escapeHtml(v.id) + '">' +
      '<h3>🧂 ' + escapeHtml(v.name) + '</h3>' +
      '<p class="district">' + escapeHtml(v.district) + '</p>' +
      '<span class="badge badge-' + escapeHtml(v.statusLevel) + '">' + escapeHtml(v.status) + '</span>' +
      '<dl>' +
      '<dt>Hộ diêm dân:</dt><dd>' + formatNumber(v.households) + ' hộ</dd>' +
      '<dt>Diện tích:</dt><dd>' + formatNumber(v.areaHa) + ' ha</dd>' +
      '<dt>Sản lượng 2026:</dt><dd>' + formatNumber(v.outputTons2026) + ' tấn</dd>' +
      '<dt>Đặc sản:</dt><dd>' + escapeHtml(v.specialty) + '</dd>' +
      '<dt>Thiệt hại lũ 2026:</dt><dd>' + v.damagePercent + '% diện tích</dd>' +
      '</dl>' +
      '<div class="damage-bar" title="Thiệt hại ' + v.damagePercent + '%"><span style="width:' + v.damagePercent + '%"></span></div>' +
      '<p>' + escapeHtml(v.note) + '</p>' +
      '</article>'
    );
  }).join('');
}

/* ---------- Lịch sản xuất theo mùa ---------- */
function renderCalendar(seasons) {
  var cal = $('#season-calendar');
  cal.innerHTML = seasons.map(function (s) {
    return (
      '<button type="button" class="month-cell month-' + escapeHtml(s.type) + '" data-month="' + s.month + '">' +
      '<strong>' + escapeHtml(s.name) + '</strong>' +
      '<small>' + escapeHtml(s.title) + '</small>' +
      '</button>'
    );
  }).join('') +
  '<div class="legend" style="grid-column:1/-1">' +
  '<span><i style="background:#16a34a"></i>Cao điểm vụ muối</span>' +
  '<span><i style="background:#f59e0b"></i>Mùa nắng – sản xuất/chuẩn bị</span>' +
  '<span><i style="background:#dc2626"></i>Mùa mưa lũ 2026 – ngừng sản xuất</span>' +
  '</div>';

  cal.querySelectorAll('.month-cell').forEach(function (btn) {
    btn.addEventListener('click', function () {
      cal.querySelectorAll('.month-cell').forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      var month = Number(btn.getAttribute('data-month'));
      var s = seasons.find(function (x) { return x.month === month; });
      $('#season-detail').innerHTML =
        '<strong>' + escapeHtml(s.name) + '/2026 – ' + escapeHtml(s.title) + '</strong><br>' +
        escapeHtml(s.detail);
    });
  });

  // Mặc định hiển thị tháng hiện tại của bối cảnh: 11/2026
  var nov = cal.querySelector('.month-cell[data-month="11"]');
  if (nov) { nov.click(); }
}

/* ---------- Bản đồ SVG ---------- */
function renderMap(villages) {
  var g = $('#map-markers');
  var svgNS = 'http://www.w3.org/2000/svg';
  villages.forEach(function (v) {
    var group = document.createElementNS(svgNS, 'g');
    group.setAttribute('class', 'marker');
    group.setAttribute('data-id', v.id);
    group.setAttribute('tabindex', '0');
    group.setAttribute('role', 'button');
    group.setAttribute('aria-label', 'Làng muối ' + v.name);

    var circle = document.createElementNS(svgNS, 'circle');
    circle.setAttribute('cx', v.map.x);
    circle.setAttribute('cy', v.map.y);
    circle.setAttribute('r', v.damagePercent >= 60 ? 12 : 9);

    var label = document.createElementNS(svgNS, 'text');
    label.setAttribute('x', v.map.x + 16);
    label.setAttribute('y', v.map.y + 5);
    label.textContent = v.name;

    group.appendChild(circle);
    group.appendChild(label);

    function select() {
      g.querySelectorAll('.marker').forEach(function (m) { m.classList.remove('active'); });
      group.classList.add('active');
      $('#map-info').innerHTML =
        '<h3>🧂 ' + escapeHtml(v.name) + '</h3>' +
        '<p><strong>' + escapeHtml(v.district) + '</strong></p>' +
        '<p>' + formatNumber(v.households) + ' hộ · ' + formatNumber(v.areaHa) + ' ha · ' +
        formatNumber(v.outputTons2026) + ' tấn (2026)</p>' +
        '<p>Thiệt hại mưa lũ 2026: <strong style="color:#dc2626">' + v.damagePercent + '%</strong></p>' +
        '<p>' + escapeHtml(v.status) + '</p>' +
        '<p><em>' + escapeHtml(v.note) + '</em></p>';
    }
    group.addEventListener('click', select);
    group.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); select(); }
    });
    g.appendChild(group);
  });
}

/* ---------- Form kết nối tiêu thụ (localStorage) ---------- */
function loadConnections() {
  try {
    var raw = localStorage.getItem(STORAGE_KEY);
    var arr = raw ? JSON.parse(raw) : [];
    return Array.isArray(arr) ? arr : [];
  } catch (e) {
    return [];
  }
}

function saveConnections(arr) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(arr));
}

function renderConnections() {
  var arr = loadConnections();
  var box = $('#connect-list');
  if (!arr.length) {
    box.innerHTML = '<p class="empty-note">Chưa có đăng ký nào. Hãy là người đầu tiên kết nối với diêm dân!</p>';
    return;
  }
  box.innerHTML = arr.map(function (c, i) {
    return (
      '<div class="connect-item">' +
      '<div class="ci-main">' +
      '<strong>' + escapeHtml(c.name) + '</strong> · ' + escapeHtml(c.phone) + '<br>' +
      '🧂 ' + escapeHtml(c.village) + ' — ' + escapeHtml(c.type) +
      (c.qty ? ' — ' + escapeHtml(c.qty) + ' tấn' : '') +
      (c.note ? '<br><em>' + escapeHtml(c.note) + '</em>' : '') +
      '<div class="ci-meta">Đăng ký: ' + escapeHtml(c.time) + ' (lưu trên trình duyệt)</div>' +
      '</div>' +
      '<button type="button" class="btn-delete" data-index="' + i + '">Xóa</button>' +
      '</div>'
    );
  }).join('');

  box.querySelectorAll('.btn-delete').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var idx = Number(btn.getAttribute('data-index'));
      var cur = loadConnections();
      cur.splice(idx, 1);
      saveConnections(cur);
      renderConnections();
    });
  });
}

function setupForm(villages) {
  var sel = $('#f-village');
  villages.forEach(function (v) {
    var opt = document.createElement('option');
    opt.value = v.name + ' (' + v.district + ')';
    opt.textContent = v.name + ' – ' + v.district;
    sel.appendChild(opt);
  });

  $('#connect-form').addEventListener('submit', function (e) {
    e.preventDefault();
    var msg = $('#form-msg');
    var name = $('#f-name').value.trim();
    var phone = $('#f-phone').value.trim();
    var village = sel.value;
    var type = $('#f-type').value;
    var qty = $('#f-qty').value;
    var note = $('#f-note').value.trim();

    if (!name || !phone || !village) {
      msg.textContent = '❌ Vui lòng nhập họ tên, số điện thoại và chọn làng muối.';
      msg.className = 'form-msg err';
      return;
    }
    if (!/^[0-9 +.\-]{8,15}$/.test(phone)) {
      msg.textContent = '❌ Số điện thoại không hợp lệ (8–15 ký tự số).';
      msg.className = 'form-msg err';
      return;
    }

    var arr = loadConnections();
    arr.unshift({
      name: name,
      phone: phone,
      village: village,
      type: type,
      qty: qty,
      note: note,
      time: new Date().toLocaleString('vi-VN')
    });
    saveConnections(arr);
    renderConnections();
    e.target.reset();
    msg.textContent = '✅ Đã lưu đăng ký! HTK sẽ hỗ trợ kết nối qua hotline 0396241674.';
    msg.className = 'form-msg ok';
  });

  renderConnections();
}

/* ---------- Khởi tạo ---------- */
function init() {
  fetch('/data/mock.json')
    .then(function (res) {
      if (!res.ok) { throw new Error('HTTP ' + res.status); }
      return res.json();
    })
    .then(function (data) {
      mockData = data;
      renderVillages(data.villages);
      renderCalendar(data.seasons);
      renderMap(data.villages);
      setupForm(data.villages);
    })
    .catch(function (err) {
      $('#village-list').innerHTML =
        '<p class="form-msg err">Không tải được dữ liệu mô phỏng (' + escapeHtml(err.message) +
        '). Vui lòng thử lại hoặc gọi HTK: <a href="tel:0396241674">0396241674</a>.</p>';
    });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}