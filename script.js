// Smooth scroll for navigation links
const navLinks = document.querySelectorAll('nav a');
navLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href.startsWith('#')) {
      e.preventDefault();
      document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Placeholder for animated galaxy background (can be enhanced with canvas/JS for more stars)
// Placeholder for roadmap and quiz logic 

// --- Skill Roadmaps Logic ---
async function loadRoadmap(skill = 'frontend') {
  const roadmapSection = document.querySelector('.roadmaps-section');
  roadmapSection.innerHTML = '<h2>Skill Roadmaps</h2><div class="roadmap-placeholder">Loading...</div>';
  try {
    const res = await fetch(`data/roadmaps/${skill}.json`);
    if (!res.ok) throw new Error('Not found');
    const data = await res.json();
    roadmapSection.innerHTML = `
      <h2>Skill Roadmaps</h2>
      <div class="roadmap-card" data-skill="${data.skill}">
        <h3>${data.skill}</h3>
        <p><strong>What is it?</strong> ${data.description}</p>
        <p><strong>Why it matters:</strong> ${data.why}</p>
        <h4>Roadmap</h4>
        <ol>
          ${data.roadmap.map(step => `<li>${step}</li>`).join('')}
        </ol>
        <h4>Resources</h4>
        <ul>
          ${data.resources.map(r => `<li><a href="${r.url}" target="_blank">${r.title} (${r.type})</a></li>`).join('')}
        </ul>
      </div>
    `;
  } catch (e) {
    roadmapSection.innerHTML = `<h2>Skill Roadmaps</h2><div class='roadmap-placeholder'>No roadmap found for this skill.</div>`;
  }
}

// Map normalized skill names to JSON filenames
const skillFileMap = {
  "frontend-development": "frontend",
  "backend-development": "backend",
  "data-structures-algorithms": "dsa",
  "ai-ml": "ai",
  "aiml": "ai",
  "ai": "ai",
  "version-control-git": "git",
  "cloud-devops": "cloud",
  "cybersecurity": "cyber",
  "system-design": "system"
};

// Add event delegation for skill card clicks
const carouselTrackEl = document.querySelector('.carousel-track');
carouselTrackEl.addEventListener('click', function(e) {
  let card = e.target.closest('.carousel-card');
  if (!card) return;
  // Remove highlight from all
  document.querySelectorAll('.carousel-card').forEach(c => c.classList.remove('selected-skill'));
  // Highlight selected
  card.classList.add('selected-skill');
  // Get skill name from alt or span
  let skill = card.querySelector('img').alt || card.querySelector('span').textContent;
  skill = skill.toLowerCase().replace(/ & | /g, '-').replace(/[^a-z0-9-]/g, '');
  skill = skillFileMap[skill] || skill;
  loadRoadmap(skill);
  // Smooth scroll to the roadmaps section
  const roadmapSection = document.querySelector('.roadmaps-section');
  if (roadmapSection) {
    roadmapSection.scrollIntoView({ behavior: 'smooth' });
  }
});

// Highlight the first skill by default
function highlightDefaultSkill() {
  const firstCard = document.querySelector('.carousel-card');
  if (firstCard) firstCard.classList.add('selected-skill');
}

// On page load
loadRoadmap('frontend');
highlightDefaultSkill();

// --- Beginner-Friendly Personality/Interest Detection Quiz ---
const interestQuiz = [
  {
    question: "What excites you the most?",
    options: {
      A: "Making beautiful websites",
      B: "Teaching computers to recognize things",
      C: "Creating useful mobile apps",
      D: "Understanding how things work behind the scenes",
      E: "Preventing hackers and protecting data"
    },
    map: {
      A: "Web Development",
      B: "AI/ML",
      C: "Mobile Development",
      D: "Cloud/DevOps",
      E: "Cybersecurity"
    }
  },
  {
    question: "How do you like solving problems?",
    options: {
      A: "I enjoy visual and creative work",
      B: "I love patterns, logic, and data",
      C: "I think of ways to simplify daily life",
      D: "I like organizing systems and making things work better",
      E: "I think like a detective and enjoy solving puzzles"
    },
    map: {
      A: "Web Development",
      B: "AI/ML",
      C: "Mobile Development",
      D: "Cloud/DevOps",
      E: "Cybersecurity"
    }
  },
  {
    question: "What kind of YouTube content would you most likely watch?",
    options: {
      A: '"How to build a portfolio website in 1 hour!"',
      B: '"Can AI write stories better than humans?"',
      C: '"Top 5 useful apps built by students"',
      D: '"How big companies manage their servers"',
      E: '"Hacker tries to break into a system (and fails)"'
    },
    map: {
      A: "Web Development",
      B: "AI/ML",
      C: "Mobile Development",
      D: "Cloud/DevOps",
      E: "Cybersecurity"
    }
  },
  {
    question: "What's your favorite school subject?",
    options: {
      A: "Art / Design",
      B: "Math / Statistics",
      C: "Business / Entrepreneurship",
      D: "Science / Physics",
      E: "Social Studies / Logic puzzles"
    },
    map: {
      A: "Web Development",
      B: "AI/ML",
      C: "Mobile Development",
      D: "Cloud/DevOps",
      E: "Cybersecurity"
    }
  },
  {
    question: "Which personality fits you best?",
    options: {
      A: "Creative & curious",
      B: "Logical & analytical",
      C: "Practical & observant",
      D: "Organized & technical",
      E: "Cautious & investigative"
    },
    map: {
      A: "Web Development",
      B: "AI/ML",
      C: "Mobile Development",
      D: "Cloud/DevOps",
      E: "Cybersecurity"
    }
  }
];

const interestColors = {
  "Web Development": "#7ecfff",
  "AI/ML": "#ffd86b",
  "Mobile Development": "#7effb2",
  "Cloud/DevOps": "#ff7e7e",
  "Cybersecurity": "#b47eff"
};
const interestTips = {
  "Web Development": "You love creativity and design! Explore <a href='#skills-gallery' style='color:#7ecfff'>Web Development</a> or <a href='#roadmaps' style='color:#7ecfff'>see the roadmap</a>.",
  "AI/ML": "You enjoy logic and data! Check out <a href='#skills-gallery' style='color:#ffd86b'>AI/ML</a> or <a href='#roadmaps' style='color:#ffd86b'>see the roadmap</a>.",
  "Mobile Development": "You like practical solutions! Try <a href='#skills-gallery' style='color:#7effb2'>Mobile App Development</a> or <a href='#roadmaps' style='color:#7effb2'>see the roadmap</a>.",
  "Cloud/DevOps": "You're organized and technical! Learn about <a href='#skills-gallery' style='color:#ff7e7e'>Cloud & DevOps</a> or <a href='#roadmaps' style='color:#ff7e7e'>see the roadmap</a>.",
  "Cybersecurity": "You're a digital detective! Explore <a href='#skills-gallery' style='color:#b47eff'>Cybersecurity</a> or <a href='#roadmaps' style='color:#b47eff'>see the roadmap</a>."
};

function loadInterestQuiz() {
  const quizSection = document.querySelector('.quiz-section');
  let current = 0;
  let tally = {};
  function renderQuestion(idx) {
    const q = interestQuiz[idx];
    quizSection.innerHTML = `
      <h2>Discover Your Tech Interest</h2>
      <div class="quiz-card">
        <p class="quiz-q">${q.question}</p>
        <div class="quiz-options">
          ${Object.entries(q.options).map(([key, val]) => `<button class="quiz-opt" data-key="${key}">${key}) ${val}</button>`).join('')}
        </div>
      </div>
    `;
    document.querySelectorAll('.quiz-opt').forEach(btn => {
      btn.onclick = function() {
        const answerKey = btn.getAttribute('data-key');
        const category = q.map[answerKey];
        tally[category] = (tally[category] || 0) + 1;
        if (current < interestQuiz.length - 1) {
          current++;
          renderQuestion(current);
        } else {
          showResult();
        }
      };
    });
  }
  function showResult() {
    // Find top 1-2 categories
    const sorted = Object.entries(tally).sort((a, b) => b[1] - a[1]);
    let resultMsg = '';
    if (sorted.length === 0) {
      resultMsg = 'No answers selected.';
    } else if (sorted.length === 1 || sorted[0][1] > sorted[1][1]) {
      const color = interestColors[sorted[0][0]] || '#7ecfff';
      resultMsg = `<span style='color:${color};font-size:1.3em;font-weight:bold;'>${sorted[0][0]}</span><br><br>${interestTips[sorted[0][0]]}`;
    } else {
      const color1 = interestColors[sorted[0][0]] || '#7ecfff';
      const color2 = interestColors[sorted[1][0]] || '#ffd86b';
      resultMsg = `<span style='color:${color1};font-size:1.2em;font-weight:bold;'>${sorted[0][0]}</span> & <span style='color:${color2};font-size:1.2em;font-weight:bold;'>${sorted[1][0]}</span><br><br>${interestTips[sorted[0][0]]}<br>${interestTips[sorted[1][0]]}`;
    }
    quizSection.innerHTML = `
      <h2>Your Tech Path Recommendation</h2>
      <div class="quiz-result">${resultMsg}<br><br>
        <button id="restart-interest-quiz">Try Again</button>
      </div>
    `;
    document.getElementById('restart-interest-quiz').onclick = () => {
      current = 0;
      tally = {};
      renderQuestion(0);
    };
  }
  renderQuestion(current);
}

// Replace the old quiz with the new interest quiz
loadInterestQuiz();

 

async function loadAPIFun() {
  const apiSection = document.querySelector('.api-fun-section');
  apiSection.innerHTML = `<h2>API Fun / Tools</h2>
    <div class='api-fun-card'>Loading motivational tip...</div>`;
  try {
    const res = await fetch('https://api.adviceslip.com/advice');
    if (!res.ok) throw new Error('API unavailable');
    const data = await res.json();
    const advice = data.slip && data.slip.advice ? data.slip.advice : 'Stay positive and keep learning!';
    apiSection.innerHTML = `<h2>API Fun / Tools</h2>
      <div class='api-fun-card'><b>Motivational Tip:</b><br>"${advice}"</div>`;
  } catch (e) {
    apiSection.innerHTML = `<h2>API Fun / Tools</h2>
      <div class='api-fun-card'><b>Motivational Tip:</b><br>Stay positive and keep learning!</div>`;
  }
}

loadAPIFun();

// --- About/Help Section (static, already in HTML) --- 

// Hamburger menu toggle for mobile nav
const hamburger = document.querySelector('.hamburger');
const navLinksEl = document.querySelector('.nav-links');
hamburger.addEventListener('click', () => {
  navLinksEl.classList.toggle('active');
});

// Responsive carousel: ensure horizontal scroll and no overflow on mobile
function makeCarouselResponsive() {
  const track = document.querySelector('.carousel-track');
  function updateCarousel() {
    if (window.innerWidth <= 700) {
      track.style.overflowX = 'auto';
      track.style.flexWrap = 'nowrap';
      track.style.scrollBehavior = 'smooth';
      track.style.WebkitOverflowScrolling = 'touch';
    } else {
      track.style.overflowX = '';
      track.style.flexWrap = '';
      track.style.scrollBehavior = '';
      track.style.WebkitOverflowScrolling = '';
    }
  }
  window.addEventListener('resize', updateCarousel);
  updateCarousel();
}
makeCarouselResponsive(); 