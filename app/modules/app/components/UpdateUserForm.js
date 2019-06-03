import React from 'react';
import { TextField, Button, Row, Col, RadioGroup, Radio, PhotoUploader, Checkbox } from '../../../commons/uikit';
import s from '../../auth/Auth.scss';

const UpdateUserForm = ({
  handleChange, handleSubmit, studentType,
  isPoorFamily, isEthnicMinority, isWoundedSoldiersKid,
  handleUpload,
  idCardFront,
  idCardBack,
  offerLetter,
  poorFamilyConfirmation,
  woundedSoldiersKidConfirmation,
  ethnicMinorityConfirmation,
  fullname, dob, gender, address,
  phone, idNumber, regNumber, specialityCode,
  studentCode, studentClass, studentFalcuty,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className={s['form-section']}>
        <span className={s['form-section-title']}>Thông tin nhân thân</span>
        <TextField
          label={"Họ và tên"}
          onChange={(e) => handleChange("fullname", e.target.value)}
          value={fullname}
        />
        <Row>
          <Col md={6}>
            <TextField 
              label={"Ngày sinh"}
              onChange={(e) => handleChange("dob", e.target.value)}
              value={dob}
            />
          </Col>
          <Col md={6}>
            <TextField 
              label={"Giới tính"}
              onChange={(e) => handleChange("gender", e.target.value)}
              value={gender}
            />
          </Col>
        </Row>
        <TextField 
          label={"Hộ khẩu thường trú"}
          onChange={(e) => handleChange("address", e.target.value)}
          value={address}
        />
        <Row>
          <Col md={6}>
            <TextField 
              label={"Số điện thoại"}
              onChange={(e) => handleChange("phone", e.target.value)}
              value={phone}
            />
          </Col>
          <Col md={6}>
            <TextField 
              label={"CMND"}
              onChange={(e) => handleChange("idNumber", e.target.value)}
              value={idNumber}
            />
          </Col>
        </Row>
        <Row className="m-b-20">
          <Col md={6}>
            <PhotoUploader
              label="CMND mặt trước"
              handleUpload={() => {}}
              onClick={() => handleUpload('idCardFront')}
              preview={idCardFront}
            />
          </Col>
          <Col md={6}>
            <PhotoUploader
              label="CMND mặt sau"
              handleUpload={() => {}}
              onClick={() => handleUpload('idCardBack')}
              preview={idCardBack}
            />
          </Col>
        </Row>
        <RadioGroup
          name="radio"
          value={studentType}
          onChange={(e, value) => handleChange("studentType", value)}
          className={s.radioGroup}
        >
          <Radio
            id="radio-1"
            label="SV mới"
            value="new-student"
            className={s.radio}
          />
          <Radio
            id="radio-2"
            label="SV cũ"
            value="rented-student"
            className="m-l-30"
          />
        </RadioGroup>
        {
          {
            'new-student': ([
              <TextField
                key="new-student-reg-number"
                label={"Số báo danh"}
                onChange={(e) => handleChange("regNumber", e.target.value)}
                value={regNumber}
              />,
              <TextField
                key="new-student-speciality-code"
                label={"Mã ngành"}
                onChange={(e) => handleChange("specialityCode", e.target.value)}
                value={specialityCode}
              />,
              <PhotoUploader
                key="new-student-offer-image"
                label="Giấy trúng tuyển"
                handleUpload={() => {}}
                onClick={() => handleUpload('offerLetter')}
                preview={offerLetter}
              />
            ]),
            'rented-student': ([
              <TextField
                key="old-student-code"
                label={"Mã số SV"}
                onChange={(e) => handleChange("studentCode", e.target.value)}
                value={studentCode}
              />,
              <TextField
                key="old-student-class"
                label={"Lớp sinh hoạt"}
                onChange={(e) => handleChange("studentClass", e.target.value)}
                value={studentClass}
              />,
              <TextField 
                key="old-student-falcuty"
                label={"Khoa"}
                onChange={(e) => handleChange("studentFalcuty", e.target.value)}
                value={studentFalcuty}
              />,
            ]),
          }[studentType]
        }
        <span style={{ marginBottom: 10, display: 'inline-block' }}>Diện ưu tiên</span>
        <Row>
          <Col md={4}>
            <Checkbox
              label="Hộ nghèo"
              id="is-poor-family"
              checked={isPoorFamily}
              onChange={e => handleChange('isPoorFamily', e.target.checked)}
            />
          </Col>
          <Col md={4}>
            <Checkbox
              label="Con thương binh, liệt sỹ"
              id="is-wounded-soldiers-kid"
              checked={isWoundedSoldiersKid}
              onChange={e => handleChange('isWoundedSoldiersKid', e.target.checked)}
            />
          </Col>
          <Col md={4}>
            <Checkbox
              label="Dân tộc thiểu số"
              id="is-ethnic-minority"
              checked={isEthnicMinority}
              onChange={e => handleChange('isEthnicMinority', e.target.checked)}
            />
          </Col>
        </Row>
        {isPoorFamily && (
          <PhotoUploader
            label="Giấy xác nhận hộ nghèo"
            handleUpload={() => {}}
            className="m-t-10"
            onClick={() => handleUpload('poorFamilyConfirmation')}
            preview={poorFamilyConfirmation}
          />
        )}
        {isWoundedSoldiersKid && (
          <PhotoUploader
            label="Giấy xác nhận con thương binh, liệt sỹ"
            handleUpload={() => {}}
            className="m-t-10"
            onClick={() => handleUpload('woundedSoldiersKidConfirmation')}
            preview={woundedSoldiersKidConfirmation}
          />
        )}
        {isEthnicMinority && (
          <PhotoUploader
            label="Giấy xác nhận dân tộc thiểu số"
            handleUpload={() => {}}
            className="m-t-10"
            onClick={() => handleUpload('ethnicMinorityConfirmation')}
            preview={ethnicMinorityConfirmation}
          />
        )}
      </div>
      <div className="flex-column-center m-t-20">
        <Button type="submit" onClick={handleSubmit}>Cập nhật</Button>
      </div>
    </form>
  )
}

export default UpdateUserForm;