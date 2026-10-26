// Kingade Scalper Bot — Shared JavaScript

// ===== MOBILE NAV =====
function toggleNav() {
    var links = document.querySelector('.nav-links');
    var burger = document.querySelector('.hamburger');
    links.classList.toggle('open');
    burger.classList.toggle('open');
}
document.addEventListener('click', function(e) {
    var nav = document.querySelector('.navbar');
    var links = document.querySelector('.nav-links');
    var burger = document.querySelector('.hamburger');
    if (nav && !nav.contains(e.target) && links && links.classList.contains('open')) {
        links.classList.remove('open');
        burger.classList.remove('open');
    }
});

// ===== CHAT WIDGET =====
function toggleChat() {
    document.getElementById('chatPopup').classList.toggle('active');
}
function closeChat() {
    document.getElementById('chatPopup').classList.remove('active');
}
document.addEventListener('click', function(e) {
    var chat = document.querySelector('.chat-widget');
    if (chat && !chat.contains(e.target)) {
        var popup = document.getElementById('chatPopup');
        if (popup) popup.classList.remove('active');
    }
});

// ===== CONTACT FORM → TELEGRAM =====
function submitContact(e) {
    e.preventDefault();
    var form = document.getElementById('contactForm');
    var data = new FormData(form);

    var name = data.get('name');
    var email = data.get('email');
    var subject = data.get('subject');
    var message = data.get('message');

    var text = '%F0%9F%93%8C%20NEW%20CONTACT%20FORM%20SUBMISSION%0A%0A';
    text += '%F0%9F%91%A4%20Name%3A%20' + encodeURIComponent(name) + '%0A';
    text += '%F0%9F%93%A7%20Email%3A%20' + encodeURIComponent(email) + '%0A';
    text += '%F0%9F%94%97%20Subject%3A%20' + encodeURIComponent(subject) + '%0A';
    text += '%F0%9F%93%8B%20Message%3A%20' + encodeURIComponent(message);

    var url = 'https://api.telegram.org/bot8803542513:AAF4TtMmcWIHAj88xNxsjHH8NYxqHMUfwag/sendMessage?chat_id=6412335897&text=' + text;

    fetch(url)
        .then(function(r) { return r.json(); })
        .then(function(result) {
            if (result.ok) {
                form.innerHTML = '<div style="text-align:center;padding:30px;"><h3 style="color:#52b788;margin-bottom:10px;">Message Sent!</h3><p style="color:#888;">We\'ll get back to you within 24 hours.</p></div>';
            } else {
                alert('Something went wrong. Please try again or contact us on Telegram.');
            }
        })
        .catch(function() {
            alert('Network error. Please try again later.');
        });
}

// ===== AFFILIATE FORM → TELEGRAM =====
function submitAffiliate(e) {
    e.preventDefault();
    var form = document.getElementById('affiliateForm');
    var data = new FormData(form);

    var name = data.get('name');
    var email = data.get('email');
    var telegram = data.get('telegram');
    var payout = data.get('payout');
    var payout_details = data.get('payout_details');
    var promo = data.get('promo');

    var text = '%F0%9F%91%A5%20NEW%20AFFILIATE%20APPLICATION%0A%0A';
    text += '%F0%9F%91%A4%20Name%3A%20' + encodeURIComponent(name) + '%0A';
    text += '%F0%9F%93%A7%20Email%3A%20' + encodeURIComponent(email) + '%0A';
    text += '%F0%9F%92%AC%20Telegram%3A%20' + encodeURIComponent(telegram) + '%0A';
    text += '%F0%9F%92%B0%20Payout%3A%20' + encodeURIComponent(payout) + '%0A';
    text += '%F0%9F%94%97%20Details%3A%20' + encodeURIComponent(payout_details) + '%0A';
    text += '%F0%9F%94%A6%20Promo%20Method%3A%20' + encodeURIComponent(promo || 'Not specified');

    var url = 'https://api.telegram.org/bot8803542513:AAF4TtMmcWIHAj88xNxsjHH8NYxqHMUfwag/sendMessage?chat_id=6412335897&text=' + text;

    fetch(url)
        .then(function(r) { return r.json(); })
        .then(function(result) {
            if (result.ok) {
                form.innerHTML = '<div style="text-align:center;padding:30px;"><h3 style="color:#52b788;margin-bottom:10px;">Application Submitted!</h3><p style="color:#888;">We\'ll review your application and send your affiliate code via Telegram within 24 hours.</p></div>';
            } else {
                alert('Something went wrong. Please contact us directly on Telegram.');
            }
        })
        .catch(function() {
            alert('Network error. Please try again later.');
        });
}

// ===== AFFILIATE DASHBOARD =====
var affiliates = {
    'TENDAI20': { name: 'Tendai M.', sales: 3, revenue: 2097, commission: 419.40, paid: 0 },
    'JAMES20': { name: 'James K.', sales: 1, revenue: 999, commission: 199.80, paid: 0 },
    'AHMED20': { name: 'Ahmed R.', sales: 2, revenue: 1098, commission: 219.60, paid: 0 }
};

function affiliateLogin() {
    var code = document.getElementById('loginCode').value.trim().toUpperCase();
    if (affiliates[code]) {
        document.getElementById('loginBox').style.display = 'none';
        document.getElementById('dashContent').style.display = 'block';
        document.getElementById('dashName').textContent = affiliates[code].name;
        document.getElementById('dashCode').textContent = code;
        document.getElementById('totalSales').textContent = affiliates[code].sales;
        document.getElementById('totalRevenue').textContent = '$' + affiliates[code].revenue.toLocaleString();
        document.getElementById('commissionOwed').textContent = '$' + affiliates[code].commission.toLocaleString();
        document.getElementById('totalPaid').textContent = '$' + affiliates[code].paid.toLocaleString();
        document.getElementById('referralLink').value = window.location.origin + '/?ref=' + code;
        localStorage.setItem('affiliateCode', code);
    } else {
        document.getElementById('loginError').style.display = 'block';
    }
}

function affiliateLogout() {
    localStorage.removeItem('affiliateCode');
    document.getElementById('loginBox').style.display = 'block';
    document.getElementById('dashContent').style.display = 'none';
    document.getElementById('loginCode').value = '';
    document.getElementById('loginError').style.display = 'none';
}

function copyCode() {
    var code = document.getElementById('dashCode').textContent;
    if (navigator.clipboard) {
        navigator.clipboard.writeText(code);
    }
}

// ===== MENTORSHIP COUNTDOWN & SLOTS =====
function initMentorshipCountdown() {
    var countdownEl = document.getElementById('mentorshipCountdown');
    if (!countdownEl) return;

    var targetDate = new Date('2026-11-02T19:00:00+01:00').getTime();

    function updateCountdown() {
        var now = new Date().getTime();
        var distance = targetDate - now;

        if (distance <= 0) {
            countdownEl.innerHTML = '<div style="color:#52b788;font-weight:800;font-size:1.2rem;">Classes Have Started!</div>';
            return;
        }

        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        var daysEl = document.getElementById('cd-days');
        var hoursEl = document.getElementById('cd-hours');
        var minsEl = document.getElementById('cd-mins');
        var secsEl = document.getElementById('cd-secs');

        if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
        if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
        if (minsEl) minsEl.textContent = String(minutes).padStart(2, '0');
        if (secsEl) secsEl.textContent = String(seconds).padStart(2, '0');
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
}

function initMentorshipSlots() {
    var slotsBanner = document.getElementById('slotsBanner');
    if (!slotsBanner) return;

    var totalSlots = parseInt(slotsBanner.getAttribute('data-total-slots') || '30', 10);
    var remainingSlots = parseInt(slotsBanner.getAttribute('data-remaining-slots') || '12', 10);

    if (remainingSlots < 0) remainingSlots = 0;
    if (remainingSlots > totalSlots) remainingSlots = totalSlots;

    var slotsLeftEl = document.getElementById('slotsLeft');
    var slotsFillEl = document.getElementById('slotsFill');

    if (slotsLeftEl) slotsLeftEl.textContent = remainingSlots;
    if (slotsFillEl) {
        var percentage = totalSlots === 0 ? 0 : (remainingSlots / totalSlots) * 100;
        slotsFillEl.style.width = percentage + '%';
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        initMentorshipCountdown();
        initMentorshipSlots();
    });
} else {
    initMentorshipCountdown();
    initMentorshipSlots();
}
    alert('Code copied: ' + code);
}

function copyLink() {
    var link = document.getElementById('referralLink').value;
    navigator.clipboard.writeText(link);
    alert('Link copied!');
}

function requestPayout() {
    var amount = document.getElementById('payoutAmount').value;
    var address = document.getElementById('payoutAddress').value;
    if (!amount || !address) { alert('Please fill in all fields.'); return; }
    if (parseFloat(amount) < 50) { alert('Minimum payout is $50.'); return; }
    alert('Payout request sent! We\'ll process it within 48 hours.');
    document.getElementById('payoutAmount').value = '';
    document.getElementById('payoutAddress').value = '';
}

// Auto-login if code is saved
(function() {
    var savedCode = localStorage.getItem('affiliateCode');
    if (savedCode && affiliates[savedCode]) {
        var loginCode = document.getElementById('loginCode');
        if (loginCode) {
            loginCode.value = savedCode;
            affiliateLogin();
        }
    }
})();
