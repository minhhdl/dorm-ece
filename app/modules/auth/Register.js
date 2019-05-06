import React, { Fragment } from 'react';
import Swal from 'sweetalert2';
import cn from 'classnames';
import Head from 'next/head';
import { register } from './services/AuthServices';
import RegisterForm from './components/RegisterForm';
import { User } from '../../commons/utils/user';

import s from './Auth.scss';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      dob: '',
      idNumber: '',
      phone: '',
      studentType: 'new-student',
      isPoorFamily: false,
      isEthnicMinority: false,
      isWoundedSoldiersKid: false,
      idCardFront: '',
      idCardBack: '',
      offerLetter: '',
      poorFamilyConfirmation: '',
      woundedSoldiersKidConfirmation: '',
      ethnicMinorityConfirmation: '',
    }

    this.startUpload = this.startUpload.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.uploadWidget = window.cloudinary.createUploadWidget({
      cloudName: 'izzilab', 
      uploadPreset: 'downyshoes',
      multiple: false,
    });
  }

  startUpload = async (field) => {
    cloudinary.openUploadWidget({
      cloudName: 'izzilab', 
      uploadPreset: 'downyshoes',
    }, (error, result) => {
      if (result && result.event === "success") {
        this.setState({ [field]: result.info.url });
      }
    });
  }

  handleChange(field, value) {
    let state = this.state;
    state[field] = value;
    this.setState(Object.assign({}, state));
  }

  async handleSubmit(e) {
    e.preventDefault();
    try {
      const {
        email, password, fullname, dob, address, phone, gender, idNumber,
        regNumber, specialityCode, studentCode, studentClass, studentFalcuty,
        studentType, isPoorFamily, isEthnicMinority, isWoundedSoldiersKid,
        idCardFront,
        idCardBack,
        offerLetter,
        poorFamilyConfirmation,
        woundedSoldiersKidConfirmation,
        ethnicMinorityConfirmation,
      } = this.state;

      const data = {
        email, password, fullname, dob, address, phone, gender,
        identity_number: idNumber,
        identity_card_front: idCardFront,
        identity_card_back: idCardBack,
        is_old_student: studentType === 'rented-student',
        is_new_student: studentType === 'new-student',
        new_student_info: {
          registration_number: regNumber,
          speciality_code: specialityCode,
          offer_letter_image: offerLetter,
        },
        old_student_info: {
          student_code: studentCode,
          class: studentClass,
          faculty: studentFalcuty,
        },
      };

      const priorities = [];
      if (isPoorFamily) priorities.push({
        name: 'poor-family',
        image: poorFamilyConfirmation,
      })
      if (isEthnicMinority) priorities.push({
        name: 'ethnic-minority',
        image: ethnicMinorityConfirmation,
      })
      if (isWoundedSoldiersKid) priorities.push({
        name: 'wounded-soldiers-kid',
        image: woundedSoldiersKidConfirmation,
      })

      data.priorities = priorities;

      const user = await register(data);
      Swal.fire({
        title: 'Thành công!',
        text: 'Đăng ký thành công. Vui lòng chờ xét duyệt từ Quản Trị Viên',
        type: 'success',
        confirmButtonText: 'OK'
      })
    } catch (e) {
      console.log(e)
      Swal.fire({
        title: 'Đã xảy ra lỗi!',
        text: 'Đăng ký không thành công. Vui lòng kiểm tra thông tin và thử lại',
        type: 'error',
        confirmButtonText: 'OK'
      })
    }
  }

  render() {
    const {
      studentType, isPoorFamily, isEthnicMinority, isWoundedSoldiersKid,
      idCardFront,
      idCardBack,
      offerLetter,
      poorFamilyConfirmation,
      woundedSoldiersKidConfirmation,
      ethnicMinorityConfirmation,
    } = this.state;
    return (
      <Fragment>
        <Head>
          <script src="https://widget.cloudinary.com/v2.0/global/all.js" type="text/javascript"></script>
        </Head>
        <div className={cn("flex-center", s["auth-page"], "admin")}>
          <div className={s["auth-block"]}>
            <h1 className={s["auth-block-title"]}>Tạo tài khoản KTX mới</h1>
            <RegisterForm
              handleChange={this.handleChange.bind(this)}
              handleSubmit={this.handleSubmit.bind(this)}
              studentType={studentType}
              isPoorFamily={isPoorFamily}
              isEthnicMinority={isEthnicMinority}
              isWoundedSoldiersKid={isWoundedSoldiersKid}
              handleUpload={this.startUpload}
              idCardFront={idCardFront}
              idCardBack={idCardBack}
              offerLetter={offerLetter}
              poorFamilyConfirmation={poorFamilyConfirmation}
              woundedSoldiersKidConfirmation={woundedSoldiersKidConfirmation}
              ethnicMinorityConfirmation={ethnicMinorityConfirmation}
            />
          </div>
        </div>
      </Fragment>
    )
  }
}

export default Register;