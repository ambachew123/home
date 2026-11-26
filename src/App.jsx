import React, { useMemo, useState } from "react";

const navigation = [
  { id: "students", label: "Students", icon: "◉" },
  { id: "families", label: "Families", icon: "⌂" },
  { id: "teachers", label: "Home teachers", icon: "▣" },
  { id: "subjects", label: "Subjects", icon: "▤" },
];

const records = {
  students: [
    { name: "Olivia Chen", initials: "OC", color: "lilac", detail: "Grade 8 · Mathematics", status: "Active", note: "Next lesson · Today, 4:00 PM" },
    { name: "Noah Williams", initials: "NW", color: "mint", detail: "Grade 6 · English", status: "Active", note: "Next lesson · Today, 5:30 PM" },
    { name: "Amara Johnson", initials: "AJ", color: "peach", detail: "Grade 10 · Biology", status: "Active", note: "Next lesson · Tomorrow, 3:00 PM" },
    { name: "Ethan Patel", initials: "EP", color: "blue", detail: "Grade 7 · Science", status: "On break", note: "Next lesson · Friday, 4:30 PM" },
  ],
  families: [
    { name: "The Chen family", initials: "C", color: "lilac", detail: "2 students · 3 subjects", status: "Active", note: "Primary contact · Mei Chen" },
    { name: "The Williams family", initials: "W", color: "mint", detail: "1 student · 2 subjects", status: "Active", note: "Primary contact · Jordan Williams" },
    { name: "The Johnson family", initials: "J", color: "peach", detail: "2 students · 4 subjects", status: "Active", note: "Primary contact · Renee Johnson" },
  ],
  teachers: [
    { name: "Sophie Martin", initials: "SM", color: "lilac", detail: "Mathematics · 8 students", status: "Available", note: "Next session · Today, 4:00 PM" },
    { name: "Daniel Brooks", initials: "DB", color: "mint", detail: "English · 6 students", status: "Available", note: "Next session · Today, 5:30 PM" },
    { name: "Priya Shah", initials: "PS", color: "peach", detail: "Science · 5 students", status: "In a lesson", note: "Next session · Today, 6:00 PM" },
  ],
  subjects: [
    { name: "Mathematics", initials: "＋", color: "lilac", detail: "8 students · 2 teachers", status: "Popular", note: "Algebra, geometry & more" },
    { name: "English", initials: "Aa", color: "mint", detail: "6 students · 2 teachers", status: "Popular", note: "Reading, writing & grammar" },
    { name: "Science", initials: "✳", color: "peach", detail: "5 students · 2 teachers", status: "Growing", note: "Biology, chemistry & physics" },
    { name: "History", initials: "◷", color: "blue", detail: "3 students · 1 teacher", status: "Available", note: "World history & civics" },
  ],
};

const pageInfo = {
  students: {
    eyebrow: "YOUR LEARNING COMMUNITY",
    title: "Students",
    description: "Keep track of your learners and what they’re working on.",
    total: "24",
    totalLabel: "Total students",
    active: "21",
    activeLabel: "Active this week",
  },
  families: {
    eyebrow: "HOME & SCHOOL, TOGETHER",
    title: "Families",
    description: "Stay connected with the families supporting each learner.",
    total: "18",
    totalLabel: "Connected families",
    active: "16",
    activeLabel: "Active this week",
  },
  teachers: {
    eyebrow: "YOUR TEACHING TEAM",
    title: "Home teachers",
    description: "Meet the teachers making a difference, one lesson at a time.",
    total: "8",
    totalLabel: "Home teachers",
    active: "6",
    activeLabel: "Teaching today",
  },
  subjects: {
    eyebrow: "LEARNING, YOUR WAY",
    title: "Subjects",
    description: "Explore the subjects your students are learning together.",
    total: "12",
    totalLabel: "Subjects offered",
    active: "9",
    activeLabel: "With lessons this week",
  },
};

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="10.8" cy="10.8" r="6.8" />
      <path d="m16 16 4 4" />
    </svg>
  );
}

function App() {
  const [page, setPage] = useState("students");
  const [query, setQuery] = useState("");
  const current = pageInfo[page];

  const visibleRecords = useMemo(() => {
    const search = query.trim().toLowerCase();
    if (!search) return records[page];
    return records[page].filter((record) =>
      `${record.name} ${record.detail} ${record.note} ${record.status}`
        .toLowerCase()
        .includes(search),
    );
  }, [page, query]);

  function changePage(nextPage) {
    setPage(nextPage);
    setQuery("");
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <a
          className="brand"
          href="#students"
          onClick={(event) => {
            event.preventDefault();
            changePage("students");
          }}
          aria-label="Classroom home"
        >
          <span className="brand-mark">c</span>
          <span>classroom<span className="brand-period">.</span></span>
        </a>

        <div className="nav-caption">WORKSPACE</div>
        <nav className="main-nav" aria-label="Main navigation">
          {navigation.map((item) => (
            <button
              className={`nav-link ${page === item.id ? "selected" : ""}`}
              key={item.id}
              onClick={() => changePage(item.id)}
              aria-current={page === item.id ? "page" : undefined}
            >
              <span className="nav-icon" aria-hidden="true">{item.icon}</span>
              <span>{item.label}</span>
              {page === item.id && <span className="active-indicator" />}
            </button>
          ))}
        </nav>

        <div className="sidebar-note">
          <div className="note-sparkle" aria-hidden="true">✳</div>
          <h3>A little progress<br />goes a long way.</h3>
          <p>Every lesson is a step forward. Keep up the lovely work!</p>
          <div className="note-decoration" aria-hidden="true">✿</div>
        </div>

        <button className="profile-button" aria-label="Signed in as Alex Morgan">
          <span className="avatar avatar-profile">AM</span>
          <span className="profile-copy">
            <strong>Alex Morgan</strong>
            <small>Home teacher</small>
          </span>
          <span className="profile-menu" aria-hidden="true">···</span>
        </button>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div className="breadcrumb"><span>Workspace</span><span className="crumb-slash">/</span><strong>{current.title}</strong></div>
          <div className="topbar-actions">
            <span className="today-label">Thursday, November 26</span>
            <button className="notification-button" aria-label="Notifications">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
                <path d="M10 21h4" />
              </svg>
              <span className="notification-dot" />
            </button>
            <span className="avatar avatar-small">AM</span>
          </div>
        </header>

        <div className="page-content">
          <section className="welcome-row">
            <div>
              <div className="eyebrow">{current.eyebrow}</div>
              <h1>{current.title}<span className="title-period">.</span></h1>
              <p className="page-description">{current.description}</p>
            </div>
            <div className="date-pill"><span className="date-icon">✳</span> A good day to learn something new</div>
          </section>

          <section className="stats-grid" aria-label={`${current.title} overview`}>
            <article className="stat-card">
              <div className="stat-top"><span>{current.totalLabel}</span><span className="stat-icon violet">♧</span></div>
              <div className="stat-bottom"><strong>{current.total}</strong><span className="stat-change">↗ &nbsp;12% <span>this month</span></span></div>
            </article>
            <article className="stat-card">
              <div className="stat-top"><span>{current.activeLabel}</span><span className="stat-icon green">↗</span></div>
              <div className="stat-bottom"><strong>{current.active}</strong><span className="stat-change neutral">Looking good</span></div>
            </article>
            <article className="stat-card highlight-stat">
              <div className="stat-top"><span>Lessons today</span><span className="stat-icon yellow">☼</span></div>
              <div className="stat-bottom"><strong>6</strong><span className="stat-change neutral">2 coming up soon</span></div>
            </article>
          </section>

          <section className="list-section">
            <div className="list-heading">
              <div>
                <h2>{page === "teachers" ? "Your teaching team" : page === "subjects" ? "All subjects" : page === "families" ? "Your families" : "Your students"}</h2>
                <p>A little overview of what’s happening right now.</p>
              </div>
              <label className="search-box">
                <SearchIcon />
                <input
                  type="search"
                  placeholder={`Search ${current.title.toLowerCase()}...`}
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  aria-label={`Search ${current.title.toLowerCase()}`}
                />
                <kbd>/</kbd>
              </label>
            </div>

            <div className="record-list">
              {visibleRecords.length > 0 ? visibleRecords.map((record) => (
                <article className="record-card" key={record.name}>
                  <span className={`avatar avatar-large ${record.color}`}>{record.initials}</span>
                  <div className="record-main">
                    <h3>{record.name}</h3>
                    <p>{record.detail}</p>
                  </div>
                  <div className="record-meta">
                    <span className={`status-badge ${record.status === "On break" ? "status-muted" : ""}`}>
                      <span className="status-dot" />{record.status}
                    </span>
                    <span className="record-note">{record.note}</span>
                  </div>
                  <button className="record-menu" aria-label={`More options for ${record.name}`}>···</button>
                </article>
              )) : (
                <div className="empty-state">
                  <span className="empty-icon"><SearchIcon /></span>
                  <strong>No matches just yet</strong>
                  <p>Try a different name or search term.</p>
                </div>
              )}
            </div>
            <div className="list-footer">
              <span>Showing <strong>{visibleRecords.length}</strong> of <strong>{current.total}</strong> {current.title.toLowerCase()}</span>
              <button className="view-all-button" onClick={() => setQuery("")}>Clear search <span>↗</span></button>
            </div>
          </section>

          <footer className="page-footer">
            <span>Made for curious minds <span className="footer-heart">♥</span></span>
            <span>Simple learning, every day.</span>
          </footer>
        </div>
      </main>
    </div>
  );
}

export default App;
