<?php
// students_dashboard.php
error_reporting(E_ALL);
ini_set('display_errors', 1);

session_start();
require 'config.php'; // must set $pdo = new PDO(...)

// ---------- Auth ----------
$student_id = $_SESSION['student_id'] ?? null;
if (!$student_id) {
    // not logged in -> redirect (or you can show a message)
    header("Location: login.php");
    exit;
}

// ---------- Tiny helper ----------
function json_output($data) {
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($data);
    exit;
}

// ---------- AJAX endpoint: fetch supervisors ----------
if (isset($_GET['action']) && $_GET['action'] === 'fetch_supervisors') {
    $dept = trim($_GET['department'] ?? '');
    if ($dept === '') {
        json_output([]);
    }
    $stmt = $pdo->prepare("SELECT id, full_name FROM supervisors WHERE department = ? ORDER BY full_name ASC");
    $stmt->execute([$dept]);
    $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
    json_output($rows);
}

// ---------- Handle POST actions ----------
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $post_action = $_POST['action'] ?? '';

    // Protect against CSRF in real app (token) — omitted for brevity
    if ($post_action === 'send_message') {
        $department = trim($_POST['department'] ?? '');
        $supervisor = intval($_POST['supervisor'] ?? 0);
        $message = trim($_POST['message'] ?? '');

        // Basic validation
        if ($department === '' || $supervisor <= 0 || $message === '') {
            $_SESSION['flash_error'] = "Please fill required fields.";
            header("Location: students_dashboard.php");
            exit;
        }

        // handle attachment
        $attachment_path = null;
        if (!empty($_FILES['attachment']['name'])) {
            $file = $_FILES['attachment'];
            if ($file['error'] === UPLOAD_ERR_OK) {
                $allowed = ['png','jpg','jpeg','pdf','doc','docx'];
                $ext = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
                if (!in_array($ext, $allowed)) {
                    $_SESSION['flash_error'] = "Attachment type not allowed.";
                    header("Location: students_dashboard.php");
                    exit;
                }
                if ($file['size'] > 10 * 1024 * 1024) { // 10MB
                    $_SESSION['flash_error'] = "Attachment too large (max 10MB).";
                    header("Location: students_dashboard.php");
                    exit;
                }
                if (!is_dir(__DIR__ . '/uploads')) {
                    mkdir(__DIR__ . '/uploads', 0755, true);
                }
                $newName = 'uploads/' . time() . '_' . rand(1000,9999) . '.' . $ext;
                if (!move_uploaded_file($file['tmp_name'], __DIR__ . '/' . $newName)) {
                    $_SESSION['flash_error'] = "Failed to save attachment.";
                    header("Location: students_dashboard.php");
                    exit;
                }
                $attachment_path = $newName;
            }
        }

        // Insert into messages
        $stmt = $pdo->prepare("INSERT INTO messages (student_id, supervisor_id, department, message, attachment, created_at) VALUES (?, ?, ?, ?, ?, NOW())");
        $stmt->execute([$student_id, $supervisor, $department, $message, $attachment_path]);

        $_SESSION['flash_success'] = "Message sent successfully.";
        header("Location: students_dashboard.php");
        exit;
    }

    if ($post_action === 'update_profile') {
        $fullname = trim($_POST['fullname'] ?? '');
        $department = trim($_POST['department'] ?? '');
        $email = trim($_POST['email'] ?? '');
        $phone = trim($_POST['phone'] ?? '');

        if ($fullname === '') {
            $_SESSION['flash_error'] = "Full name cannot be empty.";
            header("Location: students_dashboard.php");
            exit;
        }

        $stmt = $pdo->prepare("UPDATE students SET fullname = ?, department = ?, email = ?, phone = ? WHERE id = ?");
        $stmt->execute([$fullname, $department, $email, $phone, $student_id]);

        $_SESSION['flash_success'] = "Profile updated.";
        header("Location: students_dashboard.php");
        exit;
    }

    if ($post_action === 'update_photo') {
        if (!empty($_FILES['photo']['name']) && $_FILES['photo']['error'] === UPLOAD_ERR_OK) {
            $file = $_FILES['photo'];
            $allowed = ['png','jpg','jpeg'];
            $ext = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
            if (!in_array($ext, $allowed)) {
                $_SESSION['flash_error'] = "Photo must be JPG or PNG.";
                header("Location: students_dashboard.php");
                exit;
            }
            if ($file['size'] > 5 * 1024 * 1024) {
                $_SESSION['flash_error'] = "Photo too large (max 5MB).";
                header("Location: students_dashboard.php");
                exit;
            }
            if (!is_dir(__DIR__ . '/uploads')) {
                mkdir(__DIR__ . '/uploads', 0755, true);
            }
            $newName = 'uploads/profile_' . $student_id . '_' . time() . '.' . $ext;
            if (!move_uploaded_file($file['tmp_name'], __DIR__ . '/' . $newName)) {
                $_SESSION['flash_error'] = "Failed to upload photo.";
                header("Location: students_dashboard.php");
                exit;
            }
            // update DB
            $stmt = $pdo->prepare("UPDATE students SET photo = ? WHERE id = ?");
            $stmt->execute([$newName, $student_id]);

            $_SESSION['flash_success'] = "Photo updated.";
            header("Location: students_dashboard.php");
            exit;
        } else {
            $_SESSION['flash_error'] = "No photo selected.";
            header("Location: students_dashboard.php");
            exit;
        }
    }
}

// ---------- Load student & notifications for display ----------
$stmt = $pdo->prepare("SELECT * FROM students WHERE id = ?");
$stmt->execute([$student_id]);
$student = $stmt->fetch(PDO::FETCH_ASSOC);
if (!$student) {
    echo "Student not found.";
    exit;
}

// flash messages
$flash_success = $_SESSION['flash_success'] ?? '';
$flash_error = $_SESSION['flash_error'] ?? '';
unset($_SESSION['flash_success'], $_SESSION['flash_error']);

// notifications/messages (latest 10)
$notif_stmt = $pdo->prepare("SELECT m.*, s.full_name as supervisor_name 
                              FROM messages m 
                              LEFT JOIN supervisors s ON s.id = m.supervisor_id 
                              WHERE m.student_id = ? 
                              ORDER BY m.created_at DESC 
                              LIMIT 10");
$notif_stmt->execute([$student_id]);
$notifications = $notif_stmt->fetchAll(PDO::FETCH_ASSOC);

?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Student Dashboard</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
  <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">
  <style>
    /* (Paste your CSS from the frontend here) */
    /* ... for brevity I reuse the same CSS used earlier in your HTML */
    :root{--primary-color:#4361ee;--gradient-primary:linear-gradient(135deg,#4361ee,#3a0ca3);--sidebar-width:280px;--card-radius:16px;--accent-color:#4cc9f0;--card-bg:#fff;--bg-color:#f0f7ff;--text-color:#1e293b;--shadow:0 8px 30px rgba(0,0,0,0.1);--transition:all .3s ease}
    body{font-family:'Segoe UI',Tahoma,sans-serif;background:var(--bg-color);color:var(--text-color);transition:var(--transition);min-height:100vh}
    .topbar{height:70px;background:var(--gradient-primary);color:#fff;padding:0 25px;box-shadow:var(--shadow);position:relative;z-index:1000}
    .sidebar{width:var(--sidebar-width);background:#1e3a8a;color:#fff;position:fixed;top:70px;bottom:0;left:0;padding:25px 0;transition:var(--transition);overflow-y:auto;z-index:999}
    .content{margin-left:calc(var(--sidebar-width) + 20px);padding:30px;transition:var(--transition)}
    .section{display:none}
    .profile-img{width:100px;height:100px;object-fit:cover;border-radius:50%;border:3px solid var(--accent-color)}
    .card{border-radius:var(--card-radius);box-shadow:var(--shadow);background:var(--card-bg);border:none;margin-bottom:25px}
    .card-header{background:var(--gradient-primary);color:#fff;padding:18px 25px;border-bottom:none;font-weight:600}
    .form-control,.form-select{border-radius:10px;padding:12px 16px}
    @media (max-width:992px){.sidebar{transform:translateX(-100%)}.content{margin-left:0;padding:20px}}
  </style>
</head>
<body class="light-premium">

<!-- Topbar -->
<div class="topbar d-flex align-items-center justify-content-between">
  <div class="d-flex align-items-center">
    <span class="hamburger text-white" onclick="toggleSidebar()"><i class="fas fa-bars"></i></span>
    <h5 class="mb-0"><i class="fas fa-graduation-cap me-2"></i>Student Dashboard</h5>
  </div>
  <div class="d-flex align-items-center">
    <div class="theme-switcher me-3">
      <div class="theme-option theme-default active" title="Default Theme" onclick="switchTheme('light-premium')"></div>
      <div class="theme-option theme-dark" title="Dark Theme" onclick="switchTheme('dark')"></div>
    </div>
    <div class="dropdown">
      <button class="btn btn-outline-light dropdown-toggle" type="button" id="userDropdown" data-bs-toggle="dropdown">
        <i class="fas fa-user me-1"></i> <?= htmlspecialchars($student['fullname']) ?>
      </button>
      <ul class="dropdown-menu dropdown-menu-end">
        <li><a class="dropdown-item" href="#" onclick="showSection('profile')"><i class="fas fa-user me-2"></i>Profile</a></li>
        <li><a class="dropdown-item" href="#" onclick="showSection('settings')"><i class="fas fa-cog me-2"></i>Settings</a></li>
        <li><hr class="dropdown-divider"></li>
        <li><a class="dropdown-item" href="logout.php"><i class="fas fa-sign-out-alt me-2"></i>Logout</a></li>
      </ul>
    </div>
  </div>
</div>

<!-- Sidebar -->
<div class="sidebar" id="sidebar">
  <div class="profile text-center mb-4">
    <img src="<?= htmlspecialchars($student['photo'] ?: 'https://ui-avatars.com/api/?name=' . urlencode($student['fullname']) . '&background=4361ee&color=fff') ?>" alt="Profile" class="profile-img mb-2">
    <h5 class="mb-0"><?= htmlspecialchars($student['fullname']) ?></h5>
    <small class="text-muted"><?= htmlspecialchars($student['department'] ?: 'No Department') ?></small>
  </div>

  <a href="#" class="active" onclick="showSection('messages')"><i class="fas fa-envelope me-2"></i> Messages</a>
  <a href="#" onclick="showSection('notifications')"><i class="fas fa-bell me-2"></i> Notifications</a>
  <a href="#" onclick="showSection('courses')"><i class="fas fa-book me-2"></i> Courses</a>
  <a href="#" onclick="showSection('grades')"><i class="fas fa-chart-line me-2"></i> Grades</a>
  <a href="#" onclick="showSection('schedule')"><i class="fas fa-calendar-alt me-2"></i> Schedule</a>
  <a href="#" onclick="showSection('profile')"><i class="fas fa-user me-2"></i> Profile</a>
  <a href="#" onclick="showSection('settings')"><i class="fas fa-cog me-2"></i> Settings</a>
  <a href="logout.php"><i class="fas fa-sign-out-alt me-2"></i> Logout</a>
</div>

<!-- Content -->
<div class="content" id="content">

  <?php if ($flash_success): ?>
    <div class="alert alert-success"><?= htmlspecialchars($flash_success) ?></div>
  <?php endif; ?>
  <?php if ($flash_error): ?>
    <div class="alert alert-danger"><?= htmlspecialchars($flash_error) ?></div>
  <?php endif; ?>

  <!-- Messages -->
  <div id="messages" class="section">
    <div class="card">
      <div class="card-header"><h4 class="mb-0"><i class="fas fa-envelope me-2"></i> Send Message to Supervisor</h4></div>
      <div class="card-body">
        <form method="post" enctype="multipart/form-data">
          <input type="hidden" name="action" value="send_message">
          <div class="row">
            <div class="col-md-6 mb-3">
              <label class="form-label">Select Department</label>
              <select name="department" class="form-select" required>
                <option value="">-- Choose Department --</option>
                <option value="Computer">Computer</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Biology">Biology</option>
                <option value="Chemistry">Chemistry</option>
                <option value="Physics">Physics</option>
                <option value="Business Education">Business Education</option>
              </select>
            </div>
            <div class="col-md-6 mb-3">
              <label class="form-label">Select Supervisor</label>
              <select name="supervisor" class="form-select" required>
                <option value="">-- Select Supervisor --</option>
              </select>
            </div>
          </div>

          <div class="mb-3">
            <label class="form-label">Search Supervisor</label>
            <input type="text" id="searchSupervisor" class="form-control" placeholder="Search supervisor by name...">
          </div>

          <div class="mb-3">
            <label class="form-label">Your Message</label>
            <textarea name="message" class="form-control" rows="5" required></textarea>
          </div>

          <div class="mb-3">
            <label class="form-label">Attachment (Optional)</label>
            <input name="attachment" class="form-control" type="file">
          </div>

          <button class="btn btn-primary"><i class="fas fa-paper-plane me-2"></i> Send Message</button>
        </form>
      </div>
    </div>
  </div>

  <!-- Notifications -->
  <div id="notifications" class="section">
    <div class="card">
      <div class="card-header"><h4 class="mb-0"><i class="fas fa-bell me-2"></i>Your Notifications</h4></div>
      <div class="card-body">
        <?php if ($notifications): ?>
          <?php foreach ($notifications as $n): ?>
            <div class="alert alert-info">
              <strong><?= htmlspecialchars($n['supervisor_name'] ?: 'Supervisor') ?></strong>
              <div><?= nl2br(htmlspecialchars($n['message'])) ?></div>
              <?php if (!empty($n['attachment'])): ?>
                <div><a href="<?= htmlspecialchars($n['attachment']) ?>" target="_blank">View attachment</a></div>
              <?php endif; ?>
              <small class="text-muted"><?= date("d M Y H:i", strtotime($n['created_at'])) ?></small>
            </div>
          <?php endforeach; ?>
        <?php else: ?>
          <div class="alert alert-secondary">No notifications yet.</div>
        <?php endif; ?>
      </div>
    </div>
  </div>

  <!-- Courses (static demo) -->
  <div id="courses" class="section">
    <div class="card">
      <div class="card-header"><h4 class="mb-0"><i class="fas fa-book me-2"></i>Your Courses</h4></div>
      <div class="card-body">
        <!-- keep static examples or replace with DB-driven content -->
        <div class="row">
          <div class="col-md-4 mb-3">
            <div class="card h-100">
              <div class="card-header bg-primary text-white">CS101</div>
              <div class="card-body">
                <h5>Introduction to Programming</h5>
                <p>Dr. Johnson</p>
                <small class="text-muted">Mon & Wed, 10:00 - 11:30</small>
              </div>
            </div>
          </div>
          <!-- more -->
        </div>
      </div>
    </div>
  </div>

  <!-- Grades -->
  <div id="grades" class="section">
    <div class="card">
      <div class="card-header"><h4 class="mb-0"><i class="fas fa-chart-line me-2"></i>Your Grades</h4></div>
      <div class="card-body">
        <canvas id="gradesChart" height="100"></canvas>
      </div>
    </div>
  </div>

  <!-- Schedule -->
  <div id="schedule" class="section">
    <div class="card">
      <div class="card-header"><h4 class="mb-0"><i class="fas fa-calendar-alt me-2"></i>Your Schedule</h4></div>
      <div class="card-body">
        <div id="calendar">Schedule module (connect your calendar or DB)</div>
      </div>
    </div>
  </div>

  <!-- Profile -->
  <div id="profile" class="section">
    <div class="card">
      <div class="card-header"><h4 class="mb-0"><i class="fas fa-user me-2"></i>Your Profile</h4></div>
      <div class="card-body">
        <div class="row">
          <div class="col-md-3 text-center">
            <img src="<?= htmlspecialchars($student['photo'] ?: 'https://ui-avatars.com/api/?name=' . urlencode($student['fullname']) . '&background=4361ee&color=fff') ?>" class="profile-img mb-3" alt="photo">
            <form method="post" enctype="multipart/form-data">
              <input type="hidden" name="action" value="update_photo">
              <input name="photo" type="file" accept="image/*" class="form-control mb-2" required>
              <button class="btn btn-primary btn-sm">Change Photo</button>
            </form>
          </div>
          <div class="col-md-9">
            <form method="post">
              <input type="hidden" name="action" value="update_profile">
              <div class="row">
                <div class="col-md-6 mb-3">
                  <label class="form-label">Full Name</label>
                  <input name="fullname" type="text" class="form-control" value="<?= htmlspecialchars($student['fullname']) ?>">
                </div>
                <div class="col-md-6 mb-3">
                  <label class="form-label">Matric No</label>
                  <input type="text" class="form-control" value="<?= htmlspecialchars($student['matric_no']) ?>" disabled>
                </div>
                <div class="col-md-6 mb-3">
                  <label class="form-label">Department</label>
                  <input name="department" type="text" class="form-control" value="<?= htmlspecialchars($student['department']) ?>">
                </div>
                <div class="col-md-6 mb-3">
                  <label class="form-label">Email</label>
                  <input name="email" type="email" class="form-control" value="<?= htmlspecialchars($student['email']) ?>">
                </div>
                <div class="col-md-6 mb-3">
                  <label class="form-label">Phone</label>
                  <input name="phone" type="text" class="form-control" value="<?= htmlspecialchars($student['phone']) ?>">
                </div>
              </div>
              <button class="btn btn-primary"><i class="fas fa-save me-2"></i> Save Changes</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Settings -->
  <div id="settings" class="section">
    <div class="card">
      <div class="card-header"><h4 class="mb-0"><i class="fas fa-cog me-2"></i>Settings</h4></div>
      <div class="card-body">
        <!-- settings UI (static) -->
        <div class="row">
          <div class="col-md-6">
            <div class="card mb-3">
              <div class="card-body">
                <div class="form-check form-switch mb-2">
                  <input class="form-check-input" type="checkbox" id="emailNotif" checked>
                  <label class="form-check-label" for="emailNotif">Email Notifications</label>
                </div>
                <div class="form-check form-switch">
                  <input class="form-check-input" type="checkbox" id="pushNotif" checked>
                  <label class="form-check-label" for="pushNotif">Push Notifications</label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</div> <!-- content -->

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script>
/* UI JS (sections, theme, sidebar, chart, supervisor load) */

function showSection(id) {
  document.querySelectorAll('.section').forEach(s => s.style.display = 'none');
  const el = document.getElementById(id);
  if (el) el.style.display = 'block';

  document.querySelectorAll('.sidebar a').forEach(a => a.classList.remove('active'));
  const link = document.querySelector(`.sidebar a[onclick="showSection('${id}')"]`);
  if (link) link.classList.add('active');
}

function toggleSidebar() {
  const sb = document.getElementById('sidebar');
  sb.classList.toggle('hide');
  const c = document.getElementById('content');
  c.classList.toggle('full');
  if (window.innerWidth <= 992) sb.classList.toggle('mobile-show');
}

function switchTheme(name) {
  document.body.className = name;
  localStorage.setItem('theme', name);
}

document.addEventListener('DOMContentLoaded', function() {
  // initial
  showSection('messages');

  const saved = localStorage.getItem('theme') || 'light-premium';
  switchTheme(saved);

  // chart
  const ctx = document.getElementById('gradesChart');
  if (ctx) {
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Sep','Oct','Nov','Dec'],
        datasets: [{ label:'Average Grade', data:[78,85,82,88], borderColor:'#4361ee', tension:0.1, fill:true, backgroundColor:'rgba(67,97,238,0.1)'}]
      },
      options: { responsive:true, scales:{ y:{ min:70, max:100 } } }
    });
  }

  // supervisor dynamic load
  const dept = document.querySelector('select[name="department"]');
  const sup = document.querySelector('select[name="supervisor"]');
  const search = document.getElementById('searchSupervisor');

  if (dept && sup) {
    dept.addEventListener('change', async function() {
      const d = this.value;
      sup.innerHTML = '<option>Loading...</option>';
      if (!d) { sup.innerHTML = '<option value="">-- Select Supervisor --</option>'; return; }
      try {
        const res = await fetch('students_dashboard.php?action=fetch_supervisors&department=' + encodeURIComponent(d));
        const data = await res.json();
        sup.innerHTML = '<option value="">-- Select Supervisor --</option>';
        data.forEach(s => {
          const o = document.createElement('option');
          o.value = s.id;
          o.textContent = s.full_name || s.fullname || s.name || s.id;
          // store text in dataset for search
          o.dataset.label = o.textContent.toLowerCase();
          sup.appendChild(o);
        });
      } catch (err) {
        console.error(err);
        sup.innerHTML = '<option>Error loading</option>';
      }
    });

    // search filter
    if (search) {
      search.addEventListener('input', function() {
        const q = this.value.toLowerCase();
        const opts = sup.options;
        for (let i = 0; i < opts.length; i++) {
          const txt = (opts[i].dataset.label || opts[i].text).toLowerCase();
          opts[i].style.display = txt.includes(q) ? '' : 'none';
        }
      });
    }
  }
});
</script>
</body>
</html>
