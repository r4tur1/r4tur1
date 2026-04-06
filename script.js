const terminal = document.getElementById('terminal');
const input = document.getElementById('cmd-input');

// ── Personal Information ───────────────────────────────────────────────────────
const DATA = {
  name: "Aaditya Raturi",
  handle: "r4tur1",
  role: "Aspiring Developer",
  location: "New Delhi, India",
  email: "raturi.aaditya@gmail.com", // Placeholder based on common formats
  github: "github.com/r4tur1",
  linkedin: "linkedin.com/in/r4tur1",
  twitter: "twitter.com/r4tur1",
  bio: "Just finished 12th grade (PCM + CS). Serious about code. Building in public. Learning to create clean & functional web experiences.",
  education: [
    { degree: "12th Grade (PCM + CS)", school: "Senior Secondary School", year: "2026" }
  ],
  skills: [
    { name: "Python", pct: 65, category: "Comfortable" },
    { name: "SQL", pct: 60, category: "Comfortable" },
    { name: "HTML", pct: 45, category: "Learning" },
    { name: "CSS", pct: 40, category: "Learning" },
    { name: "JavaScript", pct: 30, category: "Learning" },
    { name: "Git & GitHub", pct: 20, category: "Learning" }
  ],
  projects: [
    {
      name: "Portfolio v1.0",
      desc: "My first public project, built from scratch to showcase my learning progress.",
      tags: ["HTML", "CSS", "JS", "GitHub Pages"],
      url: "https://r4tur1.github.io/"
    },
    {
      name: "Terminal Portfolio",
      desc: "An interactive CLI-styled portfolio (this one!) built as an upgrade.",
      tags: ["HTML", "CSS", "JS", "Interactive"],
      url: "https://github.com/r4tur1/r4tur1"
    }
  ],
  history: [],
  histIdx: -1
};

// ── Utility Functions ─────────────────────────────────────────────────────────
const esc = (str) => {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
};

const el = (tag, cls) => {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  return e;
};

const append = (child) => {
  terminal.appendChild(child);
  terminal.scrollTop = terminal.scrollHeight;
};

const line = (html, cls = '') => {
  const p = el('p', 'line ' + cls);
  p.innerHTML = html;
  append(p);
  return p;
};

const blank = () => line('&nbsp;');

const echoPrompt = (cmd) => {
  const row = el('div', 'prompt-line');
  row.innerHTML = `
    <span class="prompt-user">r4tur1</span><span class="prompt-at">@</span><span class="prompt-host">portfolio</span><span class="prompt-path">:~</span><span class="prompt-sym">$</span>
    <span class="prompt-cmd">${esc(cmd)}</span>
  `;
  append(row);
};

// ── Command Implementation ────────────────────────────────────────────────────
const COMMANDS = {
  help() {
    blank();
    line('<span class="c-green">Available commands:</span>');
    const table = el('div', 'output-block');
    const cmds = [
      ['whoami', 'Display personal background'],
      ['skills', 'View technical stack & proficiency'],
      ['projects', 'List of built and upcoming projects'],
      ['education', 'Academic background'],
      ['contact', 'Get social links and email'],
      ['clear', 'Clear the terminal screen'],
      ['history', 'Show command history'],
      ['echo [msg]', 'Print text to terminal'],
      ['date', 'Show current system date'],
      ['gui', 'Go back to the classic portfolio']
    ];
    
    let html = '<div style="display:grid; grid-template-columns: 120px 1fr; gap: 8px;">';
    cmds.forEach(([c, d]) => {
      html += `<span class="c-cyan">${c}</span><span class="c-dim">${d}</span>`;
    });
    html += '</div>';
    table.innerHTML = html;
    append(table);
    blank();
  },

  whoami() {
    blank();
    line(`<span class="section-header">ABOUT ME</span>`);
    line(`<span class="c-bright">${DATA.name}</span> — ${DATA.role}`);
    line(`<span class="c-dim">${DATA.location}</span>`);
    blank();
    line(DATA.bio);
    blank();
    line(`Currently: <span class="c-amber">Building in public & learning frontend fundamentals</span>`);
    blank();
  },

  skills() {
    blank();
    line(`<span class="section-header">TECHNICAL STACK</span>`);
    const block = el('div', 'output-block');
    DATA.skills.forEach(s => {
      const item = el('div', 'skill-item');
      item.innerHTML = `
        <div class="skill-info">
          <span class="skill-name">${s.name} <span class="c-dim">(${s.category})</span></span>
          <span class="skill-pct">${s.pct}%</span>
        </div>
        <div class="skill-bar-bg">
          <div class="skill-bar-fill" style="width: ${s.pct}%"></div>
        </div>
      `;
      block.appendChild(item);
    });
    append(block);
    blank();
  },

  projects() {
    blank();
    line(`<span class="section-header">PROJECTS</span>`);
    DATA.projects.forEach(p => {
      const card = el('div', 'project-card new-output');
      card.innerHTML = `
        <div class="project-title">${p.name}</div>
        <div class="project-desc">${p.desc}</div>
        <div class="project-tags">
          ${p.tags.map(t => `<span class="tag">${t}</span>`).join('')}
        </div>
      `;
      card.onclick = () => window.open(p.url, '_blank');
      append(card);
    });
    blank();
    line(`<span class="c-dim">Type <span class="c-cyan">gui</span> to visit the main site.</span>`);
    blank();
  },

  education() {
    blank();
    line(`<span class="section-header">EDUCATION</span>`);
    DATA.education.forEach(e => {
      line(`<span class="c-bright">${e.degree}</span>`);
      line(`<span class="c-dim">${e.school} — ${e.year}</span>`);
      blank();
    });
  },

  contact() {
    blank();
    line(`<span class="section-header">CONTACT</span>`);
    const block = el('div', 'output-block');
    block.innerHTML = `
      <div class="kv"><span class="kv-key">GitHub</span><span class="kv-sep">:</span><span class="kv-val"><a href="https://${DATA.github}" target="_blank" class="c-cyan">${DATA.github}</a></span></div>
      <div class="kv"><span class="kv-key">LinkedIn</span><span class="kv-sep">:</span><span class="kv-val"><a href="https://${DATA.linkedin}" target="_blank" class="c-cyan">${DATA.linkedin}</a></span></div>
      <div class="kv"><span class="kv-key">Twitter/X</span><span class="kv-sep">:</span><span class="kv-val"><a href="https://${DATA.twitter}" target="_blank" class="c-cyan">${DATA.twitter}</a></span></div>
      <div class="kv"><span class="kv-key">Email</span><span class="kv-sep">:</span><span class="kv-val c-bright">${DATA.email}</span></div>
    `;
    append(block);
    blank();
  },

  clear() {
    terminal.innerHTML = '';
  },

  date() {
    line(new Date().toString());
  },

  history() {
    DATA.history.reverse().forEach((c, i) => {
      line(`<span class="c-dim">${i + 1}</span>  ${esc(c)}`);
    });
  },

  echo(args) {
    line(esc(args.join(' ')));
  },

  gui() {
    line("Redirecting to main portfolio...");
    setTimeout(() => {
      window.location.href = "https://r4tur1.github.io/";
    }, 1000);
  }
};

// ── Boot Sequence ─────────────────────────────────────────────────────────────
const ASCII = `
  ██████╗ ██╗  ██╗████████╗██╗   ██╗██████╗  ██╗
  ██╔══██╗██║  ██║╚══██╔══╝██║   ██║██╔══██╗███║
  ██████╔╝███████║   ██║   ██║   ██║██████╔╝╚██║
  ██╔══██╗╚════██║   ██║   ██║   ██║██╔══██╗ ██║
  ██║  ██║     ██║   ██║   ╚██████╔╝██║  ██║ ██║
  ╚═╝  ╚═╝     ╚═╝   ╚═╝    ╚═════╝ ╚═╝  ╚═╝ ╚═╝
`;

function boot() {
  const bootLines = [
    { text: `<span class="c-dim">Initializing system...</span>`, delay: 100 },
    { text: `<span class="c-dim">Loading r4tur1.os kernel v2.4.0...</span>`, delay: 300 },
    { text: `<span class="c-green">OK</span> <span class="c-dim">Network established</span>`, delay: 500 },
    { text: `<span class="c-green">OK</span> <span class="c-dim">User session: r4tur1</span>`, delay: 600 },
    { text: `&nbsp;`, delay: 700 },
    { text: ASCII, delay: 800, ascii: true },
    { text: `<span class="c-bright">Welcome to Aaditya's Terminal Portfolio</span>`, delay: 1000 },
    { text: `<span class="c-dim">Type <span class="c-green">help</span> to see available commands.</span>`, delay: 1100 },
    { text: `&nbsp;`, delay: 1200 },
  ];

  bootLines.forEach(l => {
    setTimeout(() => {
      if (l.ascii) {
        const pre = el('pre', 'ascii-art new-output');
        pre.innerHTML = l.text;
        append(pre);
      } else {
        line(l.text, 'new-output');
      }
    }, l.delay);
  });
}

// ── Input Handling ────────────────────────────────────────────────────────────
input.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    const val = input.value.trim();
    echoPrompt(val);
    input.value = '';
    
    if (val) {
      DATA.history.unshift(val);
      DATA.histIdx = -1;
      
      const parts = val.split(/\s+/);
      const cmd = parts[0].toLowerCase();
      const args = parts.slice(1);
      
      if (COMMANDS[cmd]) {
        COMMANDS[cmd](args);
      } else {
        blank();
        line(`<span class="c-red">Command not found: ${esc(cmd)}</span>`);
        line(`<span class="c-dim">Type <span class="c-green">help</span> for a list of commands.</span>`);
        blank();
      }
    }
  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    if (DATA.histIdx < DATA.history.length - 1) {
      DATA.histIdx++;
      input.value = DATA.history[DATA.histIdx];
    }
  } else if (e.key === 'ArrowDown') {
    e.preventDefault();
    if (DATA.histIdx > 0) {
      DATA.histIdx--;
      input.value = DATA.history[DATA.histIdx];
    } else {
      DATA.histIdx = -1;
      input.value = '';
    }
  } else if (e.key === 'Tab') {
    e.preventDefault();
    const partial = input.value.toLowerCase();
    const match = Object.keys(COMMANDS).find(c => c.startsWith(partial));
    if (match) input.value = match;
  }
});

// Focus input on click anywhere
document.addEventListener('click', () => input.focus());

// ── Start ─────────────────────────────────────────────────────────────────────
boot();
