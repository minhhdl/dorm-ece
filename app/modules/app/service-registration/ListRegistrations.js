import React, { Fragment } from 'react';
import Swal from 'sweetalert2';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import { AppLayout, Button, Block, Row, Col } from '../../../commons/uikit';
import authenticate from '../../../commons/utils/authenticate';
import * as ServiceRegistrationServices from './services';
import s from './ServiceRegistrations.scss';

class ListServiceRegistrations extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      serviceRegistrations: [],
      openDialog: false,
      selected: null,
    };
    this.deleteServiceRegistration = this.deleteServiceRegistration.bind(this);
    this.comfirmDeleteServiceRegistration = this.comfirmDeleteServiceRegistration.bind(this);
  }

  componentDidMount() {
    this.getServiceRegistrations();
  }

  getServiceRegistrations = async () => {
    const data = await ServiceRegistrationServices.getServiceRegistrations();
    console.log(data);
    if (data) {
      this.setState({ serviceRegistrations: data.data });
    }
  }

  deleteServiceRegistration = async (index) => {
    const { serviceRegistrations } = this.state;
    const serviceRegistration = serviceRegistrations[index];
    const count = await ServiceRegistrationServices.deleteServiceRegistration(serviceRegistration._id);
    if (count) {
      serviceRegistrations.splice(index, 1);
      this.setState({ serviceRegistrations }, () => {
        Swal.fire(
          'Deleted!',
          'Your serviceRegistration has been deleted.',
          'success',
        );
      });
    }
  }

  comfirmDeleteServiceRegistration = async (index) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this serviceRegistration!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
    }).then((result) => {
      if (result.value) {
        this.deleteServiceRegistration(index);
      }
    });
  }

  handleOpenDialog(serviceRegistration) {
    this.setState({ selected: serviceRegistration, openDialog: true });
  }

  handleCloseDialog() {
    this.setState({ selected: null, openDialog: false });
  }

  activateRegistration = async (regId) => {
    try {
      await ServiceRegistrationServices.activateRegistration(regId);
      Swal.fire({
        title: 'Thành công!',
        text: 'Duyệt đơn đăng ký phòng thành công.',
        type: 'success',
        confirmButtonText: 'OK',
      })
      this.getServiceRegistrations();
    } catch (e) {
      console.log(e)
      Swal.fire({
        title: 'Đã xảy ra lỗi!',
        text: 'Duyệt đơn đăng ký phòng không thành công. Vui lòng thử lại',
        type: 'error',
        confirmButtonText: 'OK',
      })
    }
  }

  render() {
    const { serviceRegistrations, openDialog, selected } = this.state;
    return (
      <AppLayout
        title="Danh sách đăng ký dịch vụ"
        // topRightButton={(
        //   <a href={ADD_USER_URL}>
        //     <Button>
        //       Add new ServiceRegistration
        //     </Button>
        //   </a>
        // )}
      >
        <Block noHeader>
          <div className="table-responsive">
            <table>
              <tbody>
                <tr>
                  <th>
                    #
                  </th>
                  <th>
                    Họ và tên
                  </th>
                  <th>
                    Phòng
                  </th>
                  <th>
                    Dịch vụ
                  </th>
                  <th>
                    Trạng thái
                  </th>
                  <th />
                </tr>
                {serviceRegistrations.length === 0 && (
                  <tr>
                    <td colSpan={6}>Không có dữ liệu</td>
                  </tr>
                )}
                {
                  serviceRegistrations.map((dorm, key) => {
                    const {
                      _id: id, room = {}, user, parking, laundry, internet, status
                    } = dorm;
                    return (
                      <tr key={id}>
                        <td>
                          {key + 1}
                        </td>
                        <td>
                          {user.fullname || '-'}
                        </td>
                        <td>
                          P. {room.name || user.currentRoom.name || '-'}
                        </td>
                        <td>
                          {(() => {
                            const tmp = [];
                            if (parking) tmp.push('Giữ xe');
                            if (laundry) tmp.push('Giặt ủi');
                            if (internet) tmp.push('Internet');
                            return tmp.join(' - ');
                          })()}
                        </td>
                        <td>
                          {status !== 'accepted' ? 'Đang chờ duyệt' : 'Đã duyệt'}
                        </td>
                        <td className="cell-actions">
                          {/* <a href={USER_DETAIL(id)}>
                            <Button outline autoWidth className="m-r-10">
                              <i className="material-icons">
                                remove_red_eye
                              </i>
                            </Button>
                          </a> */}
                          {/* <Button className="m-r-10" outline autoWidth onClick={() => this.handleOpenDialog(dorm)}>
                            Chi tiết
                          </Button> */}
                          {status === 'pending' && ([
                            <Button className="m-r-10" outline autoWidth onClick={() => this.activateRegistration(id)}>
                              Duyệt
                            </Button>,
                            <Button className="m-r-10" outline color="danger" autoWidth onClick={() => this.rejectRegistration(id)}>
                              Từ chối
                            </Button>
                          ])}
                          {/* <a href={EDIT_USER_URL(id)}>
                            <Button outline autoWidth className="m-r-10">
                              <i className="material-icons">
                                edit
                              </i>
                            </Button>
                          </a>
                          <Button outline autoWidth color="danger" onClick={() => this.comfirmDeleteServiceRegistration(key)}>
                            <i className="material-icons">
                              delete
                            </i>
                          </Button> */}
                        </td>
                      </tr>
                    );
                  })
                }
              </tbody>
            </table>
          </div>
        </Block>

        {/* <Dialog scroll="body" maxWidth="md" open={openDialog} onClose={() => this.handleCloseDialog()} aria-labelledby="simple-dialog-title">
          <DialogTitle id="simple-dialog-title">Thông tin chi tiết đăng ký phòng</DialogTitle>
          {selected && (
            <Fragment>
              <DialogContent>
                <div className={s.field}>
                  <span className={s.fieldName}>Phòng</span>
                  <span>{selected.room.name}</span>
                </div>
                <div className={s.field}>
                  <span className={s.fieldName}>Họ và tên</span>
                  <span>{selected.serviceRegistration.fullname || 'Sinh viên 1'}</span>
                </div>
                <div className={s.field}>
                  <span className={s.fieldName}>Số điện thoại</span>
                  <span>{selected.serviceRegistration.phone}</span>
                </div>
                <div className={s.field}>
                  <span className={s.fieldName}>Email</span>
                  <span>{selected.serviceRegistration.email}</span>
                </div>
                <div className={s.field}>
                  <span className={s.fieldName}>Ngày sinh</span>
                  <span>{selected.serviceRegistration.dob || '22-02-1996'}</span>
                </div>
                
                {(() => {
                  selected.serviceRegistration.new_student_info = selected.serviceRegistration.new_student_info || {};
                  selected.serviceRegistration.old_student_info = selected.serviceRegistration.old_student_info || {};
                  return selected.serviceRegistration.is_new_student ? ([
                    <div className={s.field}>
                      <span className={s.fieldName}>Số báo danh</span>
                      <span>{selected.serviceRegistration.new_student_info.registration_number || '-'}</span>
                    </div>,
                    <div className={s.field}>
                      <span className={s.fieldName}>Mã ngành</span>
                      <span>{selected.serviceRegistration.new_student_info.speciality_code || '-'}</span>
                    </div>,
                    <div className={s.imageField}>
                      <span className={s.fieldName}>Giấy báo trúng tuyển</span>
                      {selected.serviceRegistration.new_student_info.offer_letter_image ? <img src={selected.serviceRegistration.new_student_info.offer_letter_image} /> : <span>-</span>}
                    </div>
                  ]) : ([
                    <div className={s.field}>
                      <span className={s.fieldName}>Mã sinh viên</span>
                      <span>{selected.serviceRegistration.old_student_info.student_code || '-'}</span>
                    </div>,
                    <div className={s.field}>
                      <span className={s.fieldName}>Lớp</span>
                      <span>{selected.serviceRegistration.old_student_info.class || '-'}</span>
                    </div>,
                    <div className={s.field}>
                      <span className={s.fieldName}>Khoa</span>
                      <span>{selected.serviceRegistration.old_student_info.faculty || '-'}</span>
                    </div>
                  ]);
                })()}
                <div className={s.field}>
                  <span className={s.fieldName}>Tài khoản ngân hàng</span>
                  <span>{selected.bank_account_number}</span>
                </div>
                <div className={s.field}>
                  <span className={s.fieldName}>Tên chủ thẻ</span>
                  <span>{selected.bank_account_name}</span>
                </div>
                <div className={s.imageField}>
                  <span className={s.fieldName}>Ảnh xác minh</span>
                  {selected.image ? <img src={selected.image} /> : <span>-</span>}
                </div>
              </DialogContent>
              <DialogActions>
                {!selected.status !== 'accepted' && (
                  <Button onClick={() => this.activateRegistration(selected._id)}>Duyệt đăng ký</Button>
                )}
                <Button onClick={() => this.handleCloseDialog()} color="light-grey">Đóng</Button>
              </DialogActions>
            </Fragment>
          )}
        </Dialog> */}
      </AppLayout>
    );
  }
}

export default authenticate(ListServiceRegistrations);
