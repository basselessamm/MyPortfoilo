<?php
require_once '../includes/auth.php';
require_once '../config/db.php';
require_once '../includes/attendance_helpers.php';

if ($_SESSION['role'] !== 'admin') {
    header("Location: staff_checkin.php");
    exit;
}

// جلب الموظفين
$stmt = $pdo->query("SELECT id, username, salary FROM admins WHERE role='employee' AND is_deleted=0");
$employees = $stmt->fetchAll();

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['add_absence'])) {
    $employeeId = $_POST['employee_id'];
    $absenceDate = $_POST['absence_date'];
    $shiftType = $_POST['shift_type'];

    // هات مرتب الموظف
    $stmt = $pdo->prepare("SELECT salary FROM admins WHERE id = ?");
    $stmt->execute([$employeeId]);
    $salary = (float)$stmt->fetchColumn();

    // هات عدد شيفتاته
    $stmt = $pdo->prepare("SELECT COUNT(*) FROM employee_shifts WHERE employee_id = ?");
    $stmt->execute([$employeeId]);
    $shiftCount = (int)$stmt->fetchColumn();

    if ($salary && $shiftCount > 0) {
        $dailyRate = $salary / 30;
        $shiftRate = $dailyRate / $shiftCount;
        $deduction = $shiftRate;
        $finalSalary = $salary - $deduction;

        $absenceJson = json_encode(["$absenceDate ($shiftType)"], JSON_UNESCAPED_UNICODE);

        $stmt = $pdo->prepare("
            INSERT INTO absence_reports 
            (employee_id, start_date, end_date, absence_days, absence_dates, deduction, final_salary, created_at)
            VALUES (?, ?, ?, 1, ?, ?, ?, NOW())
        ");
        $stmt->execute([$employeeId, $absenceDate, $absenceDate, $absenceJson, $deduction, $finalSalary]);

        echo "<script>alert('✅ تم تسجيل الغياب'); window.location.href='staff_checkin.php';</script>";
        exit;
    }
}
?>

<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <title>تسجيل غياب</title>
</head>
<body>
    <h2>➕ تسجيل غياب موظف</h2>
    <form method="post">
        <label>الموظف:</label>
        <select name="employee_id" required>
            <?php foreach ($employees as $emp): ?>
                <option value="<?= $emp['id'] ?>"><?= htmlspecialchars($emp['username']) ?> (<?= $emp['salary'] ?> ج)</option>
            <?php endforeach; ?>
        </select><br><br>

        <label>تاريخ الغياب:</label>
        <input type="date" name="absence_date" required><br><br>

        <label>الشيفت:</label>
        <select name="shift_type" required>
            <option value="morning">صباحي</option>
            <option value="evening">مسائي</option>
            <option value="night">ليلي</option>
        </select><br><br>

        <button type="submit" name="add_absence">حفظ الغياب</button>
    </form>
</body>
</html>
