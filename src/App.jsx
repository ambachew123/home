import React, { useMemo, useRef, useState } from "react";

const navigation = [
  { id: "students", label: "Students", icon: "◉" },
  { id: "families", label: "Families", icon: "⌂" },
  { id: "teachers", label: "Home teachers", icon: "▣" },
  { id: "subjects", label: "Subjects", icon: "▤" },
];

const familyNavigation = [
  { id: "family-home", label: "My children", icon: "◉" },
  { id: "family-find-teachers", label: "Find a teacher", icon: "⌕" },
  { id: "family-assignments", label: "Requests", icon: "▣" },
  { id: "family-materials", label: "Shared materials", icon: "▤" },
];

const teacherNavigation = [
  { id: "materials", label: "Teaching materials", icon: "▤" },
];

const studentNavigation = [
  { id: "student-materials", label: "My materials", icon: "▤" },
];

const demoAccounts = [
  {
    id: "demo-teacher",
    role: "teacher",
    name: "Alex Morgan",
    email: "teacher@classroom.demo",
    password: "teacher123",
    subject: "Mathematics",
  },
  {
    id: "demo-student",
    role: "student",
    name: "Olivia Chen",
    email: "student@classroom.demo",
    password: "student123",
    teacherId: "demo-teacher",
    grade: "Grade 8",
    familyName: "Chen",
    interestSubject: "Mathematics",
  },
  {
    id: "demo-family",
    role: "family",
    name: "Mei Chen",
    email: "family@classroom.demo",
    password: "family123",
    familyName: "Chen",
  },
];

const programs = ["Mathematics", "English", "Science", "History"];

function familyKey(name) {
  return (name || "").trim().toLowerCase().replace(/\s+family$/, "");
}

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
    { id: "sophie", name: "Sophie Martin", initials: "SM", color: "lilac", subjects: ["Mathematics"], detail: "Mathematics · 8 students", status: "Available", note: "Next session · Today, 4:00 PM" },
    { id: "daniel", name: "Daniel Brooks", initials: "DB", color: "mint", subjects: ["English"], detail: "English · 6 students", status: "Available", note: "Next session · Today, 5:30 PM" },
    { id: "priya", name: "Priya Shah", initials: "PS", color: "peach", subjects: ["Science"], detail: "Science · 5 students", status: "In a lesson", note: "Next session · Today, 6:00 PM" },
    { id: "james", name: "James Carter", initials: "JC", color: "blue", subjects: ["History"], detail: "History · 4 students", status: "Available", note: "Next session · Tomorrow, 4:00 PM" },
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
  materials: {
    eyebrow: "YOUR TEACHING LIBRARY",
    title: "Teaching materials",
    description: "Share lessons and resources with your assigned students.",
    total: "0",
    totalLabel: "Materials uploaded",
    active: "0",
    activeLabel: "Students following",
  },
  requests: {
    eyebrow: "FAMILY CONNECTIONS",
    title: "Teacher requests",
    description: "Review families asking to connect with you.",
    total: "0",
    totalLabel: "Incoming requests",
    active: "0",
    activeLabel: "Awaiting your review",
  },
};

const studentPageInfo = {
  "student-materials": {
    eyebrow: "YOUR PERSONAL LEARNING SPACE",
    title: "My materials",
    description: "Resources shared by your assigned home teacher.",
  },
};

const familyPageInfo = {
  "family-home": {
    eyebrow: "YOUR FAMILY LEARNING SPACE",
    title: "My children",
    description: "See how your children are learning and find the right support.",
  },
  "family-assignments": {
    eyebrow: "PERSONALIZED LEARNING",
    title: "Teacher assignments",
    description: "Choose a program and match your child with a home teacher.",
  },
  "family-find-teachers": {
    eyebrow: "FIND THE RIGHT MATCH",
    title: "Find a teacher",
    description: "Explore registered teachers who match your child’s interests.",
  },
  "family-materials": {
    eyebrow: "RESOURCES FROM YOUR TEACHER",
    title: "Shared materials",
    description: "Documents shared with the Chen family.",
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

function AuthPage({ accounts, onLogin, onRegister }) {
  const [role, setRole] = useState("teacher");
  const [mode, setMode] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [subject, setSubject] = useState(programs[0]);
  const [teacherId, setTeacherId] = useState(
    accounts.find((account) => account.role === "teacher")?.id || "",
  );
  const [grade, setGrade] = useState("Grade 8");
  const [familyName, setFamilyName] = useState("");
  const [error, setError] = useState("");
  const teachers = accounts.filter((account) => account.role === "teacher");

  function submit(event) {
    event.preventDefault();
    setError("");

    if (mode === "register") {
      if (accounts.some((account) => account.email.toLowerCase() === email.trim().toLowerCase())) {
        setError("An account with that email already exists. Please sign in instead.");
        return;
      }
      if (role === "student" && teacherId && !teachers.some((teacher) => teacher.id === teacherId)) {
        setError("Please register a home teacher first, then choose them as your assigned teacher.");
        return;
      }
      onRegister({
        id: `${role}-${Date.now()}`,
        role,
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password,
        ...(role === "teacher"
          ? { subject }
          : role === "student"
            ? { teacherId, grade, familyName: familyName.trim(), interestSubject: subject }
            : { familyName: familyName.trim() }),
      });
      return;
    }

    const account = accounts.find(
      (item) =>
        item.role === role &&
        item.email.toLowerCase() === email.trim().toLowerCase() &&
        item.password === password,
    );
    if (!account) {
      setError("We couldn’t find a matching account. Check your details or register.");
      return;
    }
    onLogin(account);
  }

  function chooseRole(nextRole) {
    setRole(nextRole);
    setError("");
    const firstTeacher = accounts.find((account) => account.role === "teacher");
    if (firstTeacher) setTeacherId(firstTeacher.id);
  }

  function useDemoAccount(account) {
    setRole(account.role);
    setMode("login");
    setEmail(account.email);
    setPassword(account.password);
    setError("");
  }

  const demoTeacher = accounts.find((account) => account.id === "demo-teacher");
  const demoStudent = accounts.find((account) => account.id === "demo-student");

  return (
    <main className="auth-page">
      <section className="auth-card">
        <a className="brand auth-brand" href="/" aria-label="Classroom home">
          <span className="brand-mark">c</span>
          <span>classroom<span className="brand-period">.</span></span>
        </a>
        <div className="auth-eyebrow">A LITTLE SPACE TO LEARN</div>
        <h1>{mode === "login" ? "Welcome back." : "Let’s get started."}</h1>
        <p className="auth-intro">
          {mode === "login"
            ? "Sign in to pick up where your learning left off."
            : "Create an account to join your learning community."}
        </p>

        <div className="auth-role-tabs" role="tablist" aria-label="Account type">
          {["teacher", "student", "family"].map((item) => (
            <button
              type="button"
              role="tab"
              aria-selected={role === item}
              className={role === item ? "auth-role-tab active" : "auth-role-tab"}
              key={item}
              onClick={() => chooseRole(item)}
            >
              {item === "teacher" ? "Home teacher" : item === "student" ? "Student" : "Family"}
            </button>
          ))}
        </div>

        <form className="auth-form" onSubmit={submit}>
          {mode === "register" && (
            <label className="form-field">
              <span>{role === "teacher" ? "Your name" : role === "family" ? "Your name" : "Student name"}</span>
              <input required autoComplete="name" value={name} onChange={(event) => setName(event.target.value)} placeholder={role === "teacher" ? "e.g. Alex Morgan" : role === "family" ? "e.g. Mei Chen" : "e.g. Olivia Chen"} />
            </label>
          )}
          <label className="form-field">
            <span>Email address</span>
            <input required type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" />
          </label>
          <label className="form-field">
            <span>Password</span>
            <input required type="password" autoComplete={mode === "login" ? "current-password" : "new-password"} minLength={6} value={password} onChange={(event) => setPassword(event.target.value)} placeholder="At least 6 characters" />
          </label>
          {mode === "register" && role === "teacher" && (
            <label className="form-field">
              <span>Main teaching program</span>
              <select value={subject} onChange={(event) => setSubject(event.target.value)}>
                {programs.map((program) => <option key={program}>{program}</option>)}
              </select>
            </label>
          )}
          {mode === "register" && role === "family" && (
            <label className="form-field">
              <span>Family name</span>
              <input required value={familyName} onChange={(event) => setFamilyName(event.target.value)} placeholder="e.g. Chen" />
            </label>
          )}
          {mode === "register" && role === "student" && (
            <>
              <label className="form-field">
                <span>Family name <em>Optional</em></span>
                <input value={familyName} onChange={(event) => setFamilyName(event.target.value)} placeholder="e.g. Chen" />
              </label>
              <label className="form-field">
                <span>Grade</span>
                <select value={grade} onChange={(event) => setGrade(event.target.value)}>
                  {[5, 6, 7, 8, 9, 10, 11, 12].map((level) => <option key={level}>Grade {level}</option>)}
                </select>
              </label>
              <label className="form-field">
                <span>Subject of interest</span>
                <select value={subject} onChange={(event) => setSubject(event.target.value)}>
                  {programs.map((program) => <option key={program}>{program}</option>)}
                </select>
              </label>
              <label className="form-field">
                <span>Assigned home teacher</span>
                <select value={teacherId} onChange={(event) => setTeacherId(event.target.value)} disabled={teachers.length === 0}>
                  <option value="">I don’t have a teacher yet</option>
                  {teachers.map((teacher) => <option value={teacher.id} key={teacher.id}>{teacher.name} · {teacher.subject}</option>)}
                </select>
                {teachers.length === 0 && <small>You can register now and ask a teacher to assign you later.</small>}
              </label>
            </>
          )}
          {error && <p className="auth-error" role="alert">{error}</p>}
          <button className="primary-button auth-submit" type="submit">
            {mode === "login" ? "Sign in" : "Create account"} <span>→</span>
          </button>
        </form>

        <div className="auth-toggle">
          {mode === "login" ? "New to Classroom?" : "Already have an account?"}
          <button type="button" onClick={() => { setMode(mode === "login" ? "register" : "login"); setError(""); }}>
            {mode === "login" ? "Create an account" : "Sign in"}
          </button>
        </div>
        {(demoTeacher || demoStudent) && (
          <div className="demo-access">
            <span>JUST EXPLORING?</span>
            <p>Use a demo account to preview the app.</p>
            <div className="demo-buttons">
              {demoTeacher && <button type="button" onClick={() => useDemoAccount(demoTeacher)}>Try teacher view</button>}
              {demoStudent && <button type="button" onClick={() => useDemoAccount(demoStudent)}>Try student view</button>}
              {accounts.find((account) => account.id === "demo-family") && <button type="button" onClick={() => useDemoAccount(accounts.find((account) => account.id === "demo-family"))}>Try family view</button>}
            </div>
          </div>
        )}
        <div className="local-demo-note">Demo mode · Accounts and uploaded files stay in this browser session.</div>
      </section>
      <aside className="auth-art" aria-label="Learning illustration">
        <div className="auth-art-orbit orbit-one" />
        <div className="auth-art-orbit orbit-two" />
        <div className="auth-art-book" aria-hidden="true"><span>✳</span></div>
        <div className="auth-art-copy">
          <div className="auth-art-kicker">GROW AT YOUR OWN PACE</div>
          <h2>Small steps.<br />Bright futures.</h2>
          <p>Good learning happens when the right people and the right ideas come together.</p>
        </div>
        <div className="auth-art-footer">A place for curious minds <span>♥</span></div>
      </aside>
    </main>
  );
}

function TeacherRoster({ session, accounts, onAssign }) {
  const students = accounts.filter((account) => account.role === "student");

  return (
    <section className="roster-section">
      <div className="family-section-heading">
        <div><h2>Student roster</h2><p>Assign learners to your teaching account to share materials with them.</p></div>
        <span className="children-count">{students.length} student{students.length === 1 ? "" : "s"}</span>
      </div>
      {students.length ? (
        <div className="roster-list">
          {students.map((student) => {
            const assignedTeacher = accounts.find((account) => account.id === student.teacherId);
            const assignedToMe = student.teacherId === session.id;
            return (
              <article className="roster-card" key={student.id}>
                <span className={`avatar avatar-large ${assignedToMe ? "mint" : "lilac"}`}>
                  {student.name.split(" ").map((part) => part[0]).join("").slice(0, 2).toUpperCase()}
                </span>
                <div className="roster-student-copy">
                  <strong>{student.name}</strong>
                  <span>{student.grade || "Student"}{student.familyName ? ` · ${student.familyName} family` : ""}</span>
                </div>
                <div className="roster-assignment">
                  {assignedToMe ? (
                    <span className="assigned-status"><span className="status-dot" /> Assigned to you</span>
                  ) : assignedTeacher ? (
                    <span className="assigned-to-other">Assigned to {assignedTeacher.name}</span>
                  ) : (
                    <button className="primary-button roster-assign-button" onClick={() => onAssign(student.id)}>Assign to me <span>→</span></button>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="student-empty"><span className="empty-icon"><span>◉</span></span><strong>No student accounts yet</strong><p>Students will appear here after they register.</p></div>
      )}
    </section>
  );
}

function TeacherRequests({ session, accounts, requests, onResolve }) {
  const incomingRequests = requests.filter((request) => request.teacherId === session.id);

  return (
    <section className="roster-section">
      <div className="family-section-heading">
        <div><h2>Family requests</h2><p>Review subject-matched requests before a student joins your roster.</p></div>
        <span className="children-count">{incomingRequests.filter((request) => request.status === "pending").length} pending</span>
      </div>
      {incomingRequests.length ? (
        <div className="roster-list">
          {incomingRequests.map((request) => (
            <article className="roster-card request-card" key={request.id}>
              <span className="avatar avatar-large peach">
                {request.studentName.split(" ").map((part) => part[0]).join("").slice(0, 2).toUpperCase()}
              </span>
              <div className="roster-student-copy">
                <strong>{request.studentName}</strong>
                <span>{request.familyName} family · Interested in {request.subject}</span>
                <small>Request from {request.familyContact}</small>
              </div>
              <div className="roster-assignment">
                {request.status === "pending" ? (
                  <div className="request-actions">
                    <button className="request-decline-button" onClick={() => onResolve(request.id, "declined")}>Decline</button>
                    <button className="primary-button roster-assign-button" onClick={() => onResolve(request.id, "approved")}>Approve <span>✓</span></button>
                  </div>
                ) : (
                  <span className={`request-status ${request.status}`}>{request.status === "approved" ? "Approved" : "Declined"}</span>
                )}
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="student-empty"><span className="empty-icon"><span>✓</span></span><strong>No family requests yet</strong><p>Subject-matched requests from families will appear here for your review.</p></div>
      )}
    </section>
  );
}

function TeacherMaterials({ session, accounts, materials, requests, onUpload, onAssignStudent, onResolveRequest }) {
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState(session.subject || programs[0]);
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [uploadError, setUploadError] = useState("");
  const [studentId, setStudentId] = useState("");
  const [audience, setAudience] = useState("student");
  const fileInputRef = useRef(null);
  const assignedStudents = accounts.filter(
    (account) => account.role === "student" && account.teacherId === session.id,
  );
  const pendingRequests = requests.filter(
    (request) => request.teacherId === session.id && request.status === "pending",
  );
  const ownMaterials = materials.filter((material) => material.teacherId === session.id);
  const recipient = assignedStudents.find((student) => student.id === studentId) || assignedStudents[0];

  function submit(event) {
    event.preventDefault();
    if (!file) return;
    if (!recipient) {
      setUploadError("Assign a student to your account before sharing a document.");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setUploadError("This file is over 10 MB. Please choose a smaller file.");
      return;
    }
    onUpload({
      id: `material-${Date.now()}`,
      teacherId: session.id,
      teacherName: session.name,
      studentId: recipient.id,
      studentName: recipient.name,
      familyName: recipient.familyName || "",
      familyId: recipient.familyName
        ? recipient.familyName.trim().toLowerCase().replace(/\s+family$/, "")
        : "",
      audience,
      title: title.trim() || file.name,
      subject,
      description: description.trim(),
      fileName: file.name,
      fileUrl: URL.createObjectURL(file),
      uploadedAt: new Date().toLocaleDateString(),
    });
    setTitle("");
    setDescription("");
    setFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    setUploadError("");
    setMessage("Material uploaded. Your assigned students can now see it.");
  }

  return (
    <div className="materials-page">
      <section className="materials-intro">
        <div className="materials-intro-icon" aria-hidden="true">▤</div>
        <div><h2>Share something worth learning.</h2><p>Upload a lesson or resource for students assigned to you.</p></div>
        <span className="teacher-subject-tag">{session.subject}</span>
      </section>
      <div className="teacher-management-panels">
        <details className="teacher-tool-disclosure" open={pendingRequests.length > 0}>
          <summary>
            <span>Family requests</span>
            <span className="teacher-tool-count">{pendingRequests.length} pending</span>
          </summary>
          <div className="teacher-tool-content">
            <TeacherRequests session={session} accounts={accounts} requests={requests} onResolve={onResolveRequest} />
          </div>
        </details>
        <details className="teacher-tool-disclosure" open>
          <summary>
            <span>My students</span>
            <span className="teacher-tool-count">{assignedStudents.length} assigned</span>
          </summary>
          <div className="teacher-tool-content">
            <TeacherRoster session={session} accounts={accounts} onAssign={onAssignStudent} />
          </div>
        </details>
      </div>
      <div className="materials-columns">
        <section className="material-upload-card">
          <div className="family-section-heading"><div><h2>Upload material</h2><p>PDF, document, or image · up to 10 MB</p></div></div>
          <form className="material-form" onSubmit={submit}>
            <label className="form-field"><span>Send document to</span>
              <select value={studentId || recipient?.id || ""} onChange={(event) => { setStudentId(event.target.value); setAudience("student"); }} disabled={!assignedStudents.length} required>
                {assignedStudents.length
                  ? assignedStudents.map((student) => <option value={student.id} key={student.id}>{student.name}</option>)
                  : <option value="">No students assigned yet</option>}
              </select>
              {!assignedStudents.length && <small>Assign a student from the Students page first.</small>}
            </label>
            <label className="form-field"><span>Share with</span>
              <select value={audience} onChange={(event) => setAudience(event.target.value)}>
                <option value="student">Student only</option>
                {recipient?.familyName && <option value="family">Family only</option>}
                {recipient?.familyName && <option value="both">Student and family</option>}
              </select>
              {recipient?.familyName && <small>Family: {recipient.familyName}</small>}
            </label>
            <label className="form-field"><span>Material title</span><input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="e.g. Fractions practice sheet" /></label>
            <label className="form-field"><span>Program</span>
              <select value={subject} onChange={(event) => setSubject(event.target.value)}>
                {programs.map((program) => <option key={program}>{program}</option>)}
              </select>
            </label>
            <label className="form-field"><span>Short description <em>Optional</em></span><textarea rows="3" value={description} onChange={(event) => setDescription(event.target.value)} placeholder="What will students learn from this?" /></label>
            <label className="file-drop">
              <input ref={fileInputRef} type="file" accept=".pdf,.doc,.docx,.ppt,.pptx,.jpg,.jpeg,.png,.txt" required onChange={(event) => { setFile(event.target.files[0] || null); setMessage(""); setUploadError(""); }} />
              <span className="file-drop-icon" aria-hidden="true">↑</span>
              <strong>{file ? file.name : "Choose a file to share"}</strong>
              <small>{file ? `${(file.size / (1024 * 1024)).toFixed(1)} MB selected` : "or drag it here · PDF, docs, slides, images"}</small>
            </label>
            {message && <p className="assignment-success" role="status"><span>✓</span> {message}</p>}
            {uploadError && <p className="auth-error" role="alert">{uploadError}</p>}
            <button className="primary-button assign-button" type="submit" disabled={!file}>Upload material <span>↑</span></button>
          </form>
        </section>
        <section className="teacher-material-list">
          <div className="family-section-heading"><div><h2>Your materials</h2><p>Only your uploads are shown here.</p></div><span className="assignment-count">{ownMaterials.length}</span></div>
          {ownMaterials.length ? (
            <div className="materials-list">
              {ownMaterials.map((material) => (
                <article className="material-card" key={material.id}>
                  <span className="material-file-icon" aria-hidden="true">▧</span>
                  <div className="material-card-copy">
                    <strong>{material.title}</strong>
                    <span>{material.subject} · {material.studentName}</span>
                    <small>{material.audience === "both" ? "Student + family" : material.audience === "family" ? "Family only" : "Student only"} · {material.fileName}</small>
                  </div>
                  <span className="material-date">{material.uploadedAt}</span>
                </article>
              ))}
            </div>
          ) : (
            <div className="assignments-empty"><span className="empty-icon"><span>↑</span></span><strong>No materials shared yet</strong><p>Your uploads will appear here for you and your assigned students.</p></div>
          )}
          <div className="privacy-note"><span aria-hidden="true">⌑</span><p>Resources are visible only to students who register with you as their assigned teacher.</p></div>
        </section>
      </div>
    </div>
  );
}

function StudentMaterials({ session, accounts, materials }) {
  const teacher = accounts.find((account) => account.id === session.teacherId);
  const assignedMaterials = materials.filter(
    (material) =>
      material.teacherId === session.teacherId &&
      material.studentId === session.id &&
      ["student", "both"].includes(material.audience),
  );

  return (
    <div className="student-page">
      <section className="student-welcome">
        <div className="student-welcome-avatar">{session.name.split(" ").map((part) => part[0]).join("").slice(0, 2).toUpperCase()}</div>
        <div><span className="auth-eyebrow">YOUR LEARNING SPACE</span><h2>Hi, {session.name.split(" ")[0]}!</h2><p>Here are the resources your teacher has shared with you.</p></div>
      </section>
      <section className="student-teacher-card">
        <span className="teacher-mini-avatar">{teacher ? teacher.name.split(" ").map((part) => part[0]).join("").slice(0, 2).toUpperCase() : "HT"}</span>
        <div><small>YOUR ASSIGNED HOME TEACHER</small><strong>{teacher?.name || "Not assigned yet"}</strong><span>{teacher?.subject || "A teacher can assign you from the student roster."}</span></div>
        {teacher && <span className="assigned-status"><span className="status-dot" /> Connected</span>}
      </section>
      <section className="student-materials-section">
        <div className="family-section-heading"><div><h2>Teaching materials</h2><p>{teacher ? `Shared by ${teacher.name}.` : "Teaching materials will appear after a teacher assigns you."}</p></div><span className="assignment-count">{assignedMaterials.length}</span></div>
        {assignedMaterials.length ? (
          <div className="student-materials-grid">
            {assignedMaterials.map((material) => (
              <article className="student-material-card" key={material.id}>
                <div className="student-material-top"><span className="material-file-icon" aria-hidden="true">▧</span><span className="program-chip">{material.subject}</span></div>
                <h3>{material.title}</h3>
                <p>{material.description || material.fileName}</p>
                <div className="student-material-footer"><span>{material.fileName}</span><a href={material.fileUrl} download={material.fileName} className="download-button">Download <span>↓</span></a></div>
              </article>
            ))}
          </div>
        ) : (
          <div className="student-empty"><span className="empty-icon"><span>▤</span></span><strong>{teacher ? "Your teacher hasn’t shared materials yet" : "You don’t have an assigned teacher yet"}</strong><p>{teacher ? `When ${teacher.name} uploads a resource for you, it will show up here.` : "Ask your home teacher to assign you from their student roster."}</p></div>
        )}
      </section>
    </div>
  );
}

function FamilyPortal({ page, session, accounts, requests, materials, onRequest, onNavigate }) {
  const [selectedStudentId, setSelectedStudentId] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const familyName = session.familyName || "";
  const familyId = familyKey(familyName);
  const students = accounts.filter(
    (account) => account.role === "student" && familyKey(account.familyName) === familyId,
  );
  const selectedStudent =
    students.find((student) => student.id === selectedStudentId) || students[0];
  const subject = selectedSubject || selectedStudent?.interestSubject || programs[0];
  const matchingTeachers = accounts.filter(
    (account) => account.role === "teacher" && account.subject === subject,
  );
  const familyRequests = requests.filter((request) => request.familyId === familyId);
  const familyMaterials = materials.filter(
    (material) =>
      material.familyId === familyId &&
      ["family", "both"].includes(material.audience),
  );

  function sendRequest(teacher) {
    if (!selectedStudent) return;
    const alreadyRequested = familyRequests.some(
      (request) =>
        request.studentId === selectedStudent.id &&
        request.teacherId === teacher.id &&
        request.subject === subject &&
        request.status !== "declined",
    );
    if (alreadyRequested) return;
    onRequest({
      id: `request-${Date.now()}-${selectedStudent.id}`,
      familyId,
      familyName,
      familyContact: session.name,
      studentId: selectedStudent.id,
      studentName: selectedStudent.name,
      teacherId: teacher.id,
      teacherName: teacher.name,
      subject,
      status: "pending",
    });
  }

  if (page === "family-home") {
    return (
      <>
        <section className="family-welcome">
          <div className="family-welcome-icon" aria-hidden="true">⌂</div>
          <div><h2>Welcome, {session.name.split(" ")[0]}!</h2><p>Your children’s learning journey, all in one place.</p></div>
          <button className="primary-button" onClick={() => onNavigate("family-find-teachers")}>＋ &nbsp;Find a teacher</button>
        </section>
        <section className="family-children-section">
          <div className="family-section-heading">
            <div><h2>Your children</h2><p>Student accounts registered with your family name.</p></div>
            <span className="children-count">{students.length} learner{students.length === 1 ? "" : "s"}</span>
          </div>
          {students.length ? (
            <div className="children-grid">
              {students.map((student) => {
                const teacher = accounts.find((account) => account.id === student.teacherId);
                const childRequests = familyRequests.filter((request) => request.studentId === student.id);
                return (
                  <article className="child-card" key={student.id}>
                    <div className="child-card-heading">
                      <span className="avatar avatar-large mint">{student.name.split(" ").map((part) => part[0]).join("").slice(0, 2).toUpperCase()}</span>
                      <div><h3>{student.name}</h3><p>{student.grade} · {familyName} family</p></div>
                      <span className={`request-status ${teacher ? "approved" : "pending"}`}>{teacher ? "Assigned" : "No teacher yet"}</span>
                    </div>
                    <div className="child-programs-label">SUBJECT OF INTEREST</div>
                    <div className="program-chips"><span className="program-chip">{student.interestSubject || "Not selected"}</span></div>
                    <div className="child-card-footer">
                      <span>{teacher ? teacher.name : `${childRequests.filter((request) => request.status === "pending").length} request(s) pending`}</span>
                      <button className="text-button" onClick={() => {
                        setSelectedStudentId(student.id);
                        setSelectedSubject(student.interestSubject || programs[0]);
                        onNavigate("family-find-teachers");
                      }}>Find a teacher <span>→</span></button>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="student-empty"><span className="empty-icon"><span>◉</span></span><strong>No student account is linked yet</strong><p>Register your student with the family name “{familyName}” to see them here.</p></div>
          )}
        </section>
      </>
    );
  }

  if (page === "family-find-teachers") {
    return (
      <div className="family-discovery">
        <section className="assignment-panel">
          <div className="assignment-heading"><span className="assignment-icon">⌕</span><div><h2>Match your child with a teacher</h2><p>Only registered teachers for the selected subject are listed.</p></div></div>
          {students.length ? (
            <>
              <div className="assignment-form family-match-fields">
                <label className="form-field"><span>Choose your student</span>
                  <select value={selectedStudent?.id || ""} onChange={(event) => {
                    setSelectedStudentId(event.target.value);
                    const nextStudent = students.find((student) => student.id === event.target.value);
                    setSelectedSubject(nextStudent?.interestSubject || programs[0]);
                  }}>
                    {students.map((student) => <option key={student.id} value={student.id}>{student.name} · {student.grade}</option>)}
                  </select>
                </label>
                <label className="form-field"><span>Student’s subject interest</span>
                  <select value={subject} onChange={(event) => setSelectedSubject(event.target.value)}>
                    {programs.map((program) => <option key={program}>{program}</option>)}
                  </select>
                  <small>Registered interest: {selectedStudent?.interestSubject || "Not selected"}</small>
                </label>
              </div>
              <div className="teacher-match-list">
                {matchingTeachers.length ? matchingTeachers.map((teacher) => {
                  const existingRequest = familyRequests.find(
                    (request) =>
                      request.studentId === selectedStudent.id &&
                      request.teacherId === teacher.id &&
                      request.subject === subject &&
                      request.status !== "declined",
                  );
                  return (
                    <article className="teacher-match-card" key={teacher.id}>
                      <span className="avatar avatar-large lilac">{teacher.name.split(" ").map((part) => part[0]).join("").slice(0, 2).toUpperCase()}</span>
                      <div className="teacher-match-copy"><strong>{teacher.name}</strong><span>{teacher.subject} teacher</span><small>Registered home teacher</small></div>
                      {existingRequest ? (
                        <span className={`request-status ${existingRequest.status}`}>{existingRequest.status === "approved" ? "Connected" : "Request sent"}</span>
                      ) : (
                        <button className="primary-button roster-assign-button" onClick={() => sendRequest(teacher)}>Request teacher <span>→</span></button>
                      )}
                    </article>
                  );
                }) : (
                  <div className="student-empty"><span className="empty-icon"><span>⌕</span></span><strong>No registered {subject} teachers yet</strong><p>Try another subject or check back later.</p></div>
                )}
              </div>
            </>
          ) : (
            <div className="student-empty"><span className="empty-icon"><span>◉</span></span><strong>Register your student first</strong><p>Add the same family name to the student account to match them with a teacher.</p></div>
          )}
        </section>
      </div>
    );
  }

  if (page === "family-assignments") {
    return (
      <section className="family-requests-section">
        <div className="family-section-heading"><div><h2>Teacher requests</h2><p>Track requests sent to registered teachers.</p></div><span className="assignment-count">{familyRequests.length}</span></div>
        {familyRequests.length ? (
          <div className="roster-list">
            {familyRequests.map((request) => (
              <article className="roster-card" key={request.id}>
                <span className="avatar avatar-large lilac">{request.teacherName.split(" ").map((part) => part[0]).join("").slice(0, 2).toUpperCase()}</span>
                <div className="roster-student-copy"><strong>{request.teacherName}</strong><span>{request.subject} · for {request.studentName}</span></div>
                <span className={`request-status ${request.status}`}>{request.status === "approved" ? "Approved" : request.status === "declined" ? "Declined" : "Awaiting teacher"}</span>
              </article>
            ))}
          </div>
        ) : (
          <div className="student-empty"><span className="empty-icon"><span>▣</span></span><strong>No requests yet</strong><p>Find a teacher who matches your student’s interests to send a request.</p></div>
        )}
      </section>
    );
  }

  return (
    <div className="family-shared-materials">
      <section className="family-welcome">
        <div className="family-welcome-icon" aria-hidden="true">▤</div>
        <div><h2>Documents for your family</h2><p>Resources shared with the {familyName} family.</p></div>
      </section>
      <section className="student-materials-section">
        <div className="family-section-heading"><div><h2>Shared with family</h2><p>Only documents sent to your family are shown here.</p></div><span className="assignment-count">{familyMaterials.length}</span></div>
        {familyMaterials.length ? (
          <div className="student-materials-grid">
            {familyMaterials.map((material) => (
              <article className="student-material-card" key={material.id}>
                <div className="student-material-top"><span className="material-file-icon" aria-hidden="true">▧</span><span className="program-chip">{material.subject}</span></div>
                <h3>{material.title}</h3>
                <p>{material.description || material.fileName}</p>
                <div className="student-material-footer"><span>For {material.studentName} · from {material.teacherName}</span><a href={material.fileUrl} download={material.fileName} className="download-button">Download <span>↓</span></a></div>
              </article>
            ))}
          </div>
        ) : (
          <div className="student-empty"><span className="empty-icon"><span>▤</span></span><strong>No documents shared with family yet</strong><p>When a teacher shares a document with your family, you’ll find it here.</p></div>
        )}
      </section>
    </div>
  );
}

function App() {
  const [page, setPage] = useState("students");
  const [query, setQuery] = useState("");
  const [accounts, setAccounts] = useState(demoAccounts);
  const [session, setSession] = useState(null);
  const [materials, setMaterials] = useState([]);
  const [requests, setRequests] = useState([]);
  const isStudent = session?.role === "student";
  const isFamily = session?.role === "family";
  const current = isFamily
    ? familyPageInfo[page]
    : isStudent
      ? studentPageInfo[page]
      : pageInfo[page];
  const activeNavigation = isStudent
    ? studentNavigation
    : isFamily
      ? familyNavigation
      : teacherNavigation;

  const visibleRecords = useMemo(() => {
    if (isFamily || isStudent || page === "materials" || page === "requests") return [];
    const search = query.trim().toLowerCase();
    if (!search) return records[page];
    return records[page].filter((record) =>
      `${record.name} ${record.detail} ${record.note} ${record.status}`
        .toLowerCase()
        .includes(search),
    );
  }, [isFamily, isStudent, page, query]);

  function changePage(nextPage) {
    setPage(nextPage);
    setQuery("");
  }

  function signIn(account) {
    setSession(account);
    setPage(account.role === "student" ? "student-materials" : account.role === "family" ? "family-home" : "materials");
    setQuery("");
  }

  function registerAccount(account) {
    setAccounts((currentAccounts) => [...currentAccounts, account]);
    signIn(account);
  }

  function signOut() {
    setSession(null);
    setPage("students");
    setQuery("");
  }

  function resolveRequest(requestId, status) {
    const request = requests.find((item) => item.id === requestId);
    setRequests((currentRequests) =>
      currentRequests.map((item) => item.id === requestId ? { ...item, status } : item),
    );
    if (status === "approved" && request) {
      setAccounts((currentAccounts) =>
        currentAccounts.map((account) =>
          account.id === request.studentId
            ? { ...account, teacherId: request.teacherId }
            : account,
        ),
      );
    }
  }

  if (!session) {
    return <AuthPage accounts={accounts} onLogin={signIn} onRegister={registerAccount} />;
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <a
          className="brand"
          href="#students"
          onClick={(event) => {
            event.preventDefault();
            changePage(isStudent ? "student-materials" : isFamily ? "family-home" : "materials");
          }}
          aria-label="Classroom home"
        >
          <span className="brand-mark">c</span>
          <span>classroom<span className="brand-period">.</span></span>
        </a>

        <div className="nav-caption">WORKSPACE</div>
        <nav className="main-nav" aria-label="Main navigation">
          {activeNavigation.map((item) => (
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

        <button className="profile-button" onClick={signOut} aria-label={`Sign out ${session.name}`} title="Sign out">
          <span className={`avatar avatar-profile ${isStudent ? "mint" : ""}`}>{session.name.split(" ").map((part) => part[0]).join("").slice(0, 2).toUpperCase()}</span>
          <span className="profile-copy">
            <strong>{session.name}</strong>
            <small>{isStudent ? "Student" : isFamily ? "Family account" : "Home teacher"}</small>
          </span>
          <span className="profile-menu" aria-hidden="true">↪</span>
        </button>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div className="breadcrumb"><span>Workspace</span><span className="crumb-slash">/</span><strong>{current.title}</strong></div>
          <div className="topbar-actions">
            <span className="signed-in-as">{isStudent ? "Student account" : isFamily ? "Family account" : "Home teacher account"}</span>
            <span className="today-label">Thursday, November 26</span>
            <button className="logout-button" onClick={signOut}>Sign out</button>
            <button className="notification-button" aria-label="Notifications">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
                <path d="M10 21h4" />
              </svg>
              <span className="notification-dot" />
            </button>
            <span className={`avatar avatar-small ${isFamily || isStudent ? "mint" : ""}`}>{session.name.split(" ").map((part) => part[0]).join("").slice(0, 2).toUpperCase()}</span>
          </div>
        </header>

        <div className={`page-content ${isFamily ? "family-page-content" : isStudent ? "student-page-content" : ""}`}>
          {isStudent ? (
            <StudentMaterials session={session} accounts={accounts} materials={materials} />
          ) : isFamily ? (
            <FamilyPortal
              page={page}
              session={session}
              accounts={accounts}
              requests={requests}
              materials={materials}
              onRequest={(request) => setRequests((currentRequests) => [...currentRequests, request])}
              onNavigate={changePage}
            />
          ) : page === "requests" ? (
            <TeacherRequests
              session={session}
              accounts={accounts}
              requests={requests}
              onResolve={resolveRequest}
            />
          ) : page === "students" ? (
            <TeacherRoster
              session={session}
              accounts={accounts}
              onAssign={(studentId) => setAccounts((currentAccounts) =>
                currentAccounts.map((account) =>
                  account.id === studentId ? { ...account, teacherId: session.id } : account,
                ),
              )}
            />
          ) : page === "materials" ? (
            <TeacherMaterials
              session={session}
              accounts={accounts}
              materials={materials}
              requests={requests}
              onUpload={(material) => setMaterials((currentMaterials) => [...currentMaterials, material])}
              onAssignStudent={(studentId) => setAccounts((currentAccounts) =>
                currentAccounts.map((account) =>
                  account.id === studentId ? { ...account, teacherId: session.id } : account,
                ),
              )}
              onResolveRequest={resolveRequest}
            />
          ) : (
            <>
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
            </>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
