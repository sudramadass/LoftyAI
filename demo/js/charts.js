function createChartPalette() {
  return {
    untouched: '#ef4444',
    contacted: '#f59e0b',
    hot: '#3b82f6',
    closed: '#22c55e',
    listing: '#3B82F6',
    listingAlt: '#A855F7',
    listingAlt2: '#14B8A6',
    trendA: '#7c3aed',
    trendB: '#38bdf8',
    trendC: '#34d399',
    mutedText: '#888888',
    gridLine: 'rgba(255,255,255,0.08)'
  };
}

function initCharts() {
  const palette = createChartPalette();

  Chart.register({
    id: 'centerText',
    beforeDraw(chart) {
      const centerText = chart.config.options.plugins.centerText;
      if (!centerText) return;
      const { ctx, chartArea: { width, height } } = chart;
      ctx.save();
      ctx.fillStyle = centerText.color || '#ffffff';
      ctx.font = centerText.font || '700 16px Sora, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(centerText.text, width / 2, height / 2);
      ctx.restore();
    }
  });

  new Chart(document.getElementById('pipelineChart'), {
    type: 'doughnut',
    data: {
      labels: ['Untouched', 'Contacted', 'Hot', 'Closed'],
      datasets: [{
        data: [9, 8, 5, 3],
        backgroundColor: [palette.untouched, palette.contacted, palette.hot, palette.closed],
        borderWidth: 0
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
          align: 'end',
          labels: { color: '#555', font: { size: 10 }, usePointStyle: true, pointStyle: 'circle', padding: 12 }
        },
        tooltip: { backgroundColor: '#111111', titleColor: '#ffffff', bodyColor: '#e8e8e8', borderColor: '#2a2a2a', borderWidth: 1 },
        centerText: { text: '25 Total', color: '#e8e8e8', font: '700 16px Sora, sans-serif' }
      }
    }
  });

  new Chart(document.getElementById('engagementChart'), {
    type: 'bar',
    data: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [
        { label: '4891 E Sunrise Dr',  data: [42,57,49,63,55,68,61], backgroundColor: palette.listing,    borderRadius: 6, barThickness: 18 },
        { label: '3488 Cedar St',      data: [33,45,37,52,44,50,47], backgroundColor: palette.listingAlt,  borderRadius: 6, barThickness: 18 },
        { label: '182 Saint Peter St', data: [28,35,30,39,34,42,36], backgroundColor: palette.listingAlt2, borderRadius: 6, barThickness: 18 }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: 'top', align: 'end', labels: { color: '#555', font: { size: 10 }, boxWidth: 10, padding: 12 } },
        tooltip: { backgroundColor: '#111111', titleColor: '#ffffff', bodyColor: '#e8e8e8', borderColor: '#2a2a2a', borderWidth: 1 }
      },
      scales: {
        x: { grid: { display: false }, ticks: { color: palette.mutedText } },
        y: { grid: { color: palette.gridLine, drawBorder: false }, ticks: { color: palette.mutedText, stepSize: 20 } }
      }
    }
  });

  new Chart(document.getElementById('trendChart'), {
    type: 'line',
    data: {
      labels: ['Day 1','Day 2','Day 3','Day 4','Day 5','Day 6','Day 7','Day 8','Day 9','Day 10','Day 11','Day 12','Day 13','Day 14'],
      datasets: [
        { label: 'Brandon Allen', data: [68,70,73,75,76,80,82,84,86,87,88,87,88,88], borderColor: palette.trendA, pointBackgroundColor: palette.trendA, pointRadius: 4, fill: false, tension: 0.3, borderWidth: 2 },
        { label: 'Samuel Scott',  data: [56,57,58,60,62,64,66,68,69,71,72,73,74,74], borderColor: palette.trendB, pointBackgroundColor: palette.trendB, pointRadius: 4, fill: false, tension: 0.3, borderWidth: 2 },
        { label: 'Kevin Lee',     data: [48,50,51,53,55,56,57,58,59,60,61,61,61,61], borderColor: palette.trendC, pointBackgroundColor: palette.trendC, pointRadius: 4, fill: false, tension: 0.3, borderWidth: 2 }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: 'top', align: 'end', labels: { color: '#555', font: { size: 10 }, boxWidth: 10, padding: 12 } },
        tooltip: { backgroundColor: '#111111', titleColor: '#ffffff', bodyColor: '#e8e8e8', borderColor: '#2a2a2a', borderWidth: 1 }
      },
      scales: {
        x: { grid: { display: false }, ticks: { color: palette.mutedText } },
        y: { grid: { color: palette.gridLine, drawBorder: false }, ticks: { color: palette.mutedText, stepSize: 10 } }
      }
    }
  });
}

initCharts();

function scrollToLeadCards() {
  document.querySelector('.card-lift')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function scrollToHighestEngagement() {
  alert('Highest engagement: 4891 E Sunrise Dr (61 views on Sun). Brandon Allen viewed this property twice.');
}

function scrollToBrandonCard() {
  document.querySelectorAll('.card-lift')[0]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
