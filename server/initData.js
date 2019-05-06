const bcrypt = require('bcrypt');
const User = require('./models/user');

const initAdministrator = async () => {
  const password = await bcrypt.hash('admin', 10);
  const adminInfo = {
    email: 'admin@admin.com',
    password,
    fullname: 'Administrator',
    role: 'admin',
  };

  const admin = await User.findOne({ email: adminInfo.email }).exec();
  if (!admin) await User.create(adminInfo);
}

const initStudentAccount = async () => {
  const password = await bcrypt.hash('test', 10);
  const student = {
    email: 'test@test.com',
    password,
    fullname: 'Sinh viên',
    role: 'student',
    phone: '0919266906',
    identity_number: '201720127',
    is_old_student: true,
    old_student_info: {
      student_code: 'AS20282',
      class: '14TCLC1',
      faculty: 'Công nghệ thông tin',
    },
  };

  const admin = await User.findOne({ email: student.email }).exec();
  if (!admin) await User.create(student);
}

module.exports = async () => {
  await initAdministrator();
  await initStudentAccount();
}