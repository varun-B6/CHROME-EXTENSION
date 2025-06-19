// Same lists for classification
const productiveSites = [
  'github.com', 'stackoverflow.com', 'leetcode.com', 'codepen.io', 'developer.mozilla.org'
];

const unproductiveSites = [
  'facebook.com', 'youtube.com', 'instagram.com', 'twitter.com', 'reddit.com'
];

// Convert ms to minutes (rounded)
function msToMinutes(ms) {
  return Math.round(ms / 60000);
}

// Get classification category for a domain
function getCategory(domain) {
  if (productiveSites.includes(domain)) return 'productive';
  if (unproductiveSites.includes(domain)) return 'unproductive';
  return 'neutral';
}

// Render chart and stats
function renderDashboard(data) {
  let totalMs = 0;
  let productiveMs = 0;
  let unproductiveMs = 0;

  for (const [domain, timeMs] of Object.entries(data)) {
    totalMs += timeMs;
    const category = getCategory(domain);
    if (category === 'productive') productiveMs += timeMs;
    else if (category === 'unproductive') unproductiveMs += timeMs;
  }

  document.getElementById('totalTime').textContent = msToMinutes(totalMs);
  document.getElementById('productiveTime').textContent = msToMinutes(productiveMs);
  document.getElementById('unproductiveTime').textContent = msToMinutes(unproductiveMs);

  const ctx = document.getElementById('chart').getContext('2d');
  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Productive', 'Unproductive', 'Neutral'],
      datasets: [{
        data: [productiveMs, unproductiveMs, totalMs - productiveMs - unproductiveMs],
        backgroundColor: ['#4caf50', '#f44336', '#9e9e9e']
      }]
    }
  });
}

// Request time data from background script
chrome.runtime.sendMessage({ action: 'getData' }, (response) => {
  if (response && response.data) {
    renderDashboard(response.data);
  }
});
