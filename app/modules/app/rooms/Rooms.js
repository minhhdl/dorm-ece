import React, { Fragment } from 'react';
import Swal from 'sweetalert2';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import { AppLayout, Button, Block, TextField, Select } from '../../../commons/uikit';
import authenticate from '../../../commons/utils/authenticate';
import * as RoomServices from './services';
import s from './Rooms.scss';

const defaultRoom = {
  name: '',
  number_of_blank_dorm: { label: '4 giường', value: 4 },
  status: { label: 'Còn giường trống', value: 'not-full' },
};

const getStatusOption = (status) => {
  let statusOption = {};
  switch(status) {
    case 'full': statusOption = { label: 'Hết giường', value: 'full' }; break;
    case 'not-full': statusOption = { label: 'Còn giường trống', value: 'not-full' }; break;
    default: statusOption = { label: 'Còn giường trống', value: 'not-full' };
  };

  return statusOption;
}

const getDormOption = (number_of_blank_dorm) => {
  let dormOptions = {};
  switch(number_of_blank_dorm) {
    case 1: dormOptions = { label: '1 giường', value: 1 }; break;
    case 2: dormOptions = { label: '2 giường', value: 2 }; break;
    case 3: dormOptions = { label: '3 giường', value: 3 }; break;
    case 4: dormOptions = { label: '4 giường', value: 4 }; break;
    default: dormOptions = { label: '4 giường', value: 4 };
  };

  return dormOptions;
}

class Rooms extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rooms: [],
      openDialog: false,
      selected: null,
      ...defaultRoom,
    };
    this.deleteRoom = this.deleteRoom.bind(this);
    this.confirmDeleteRoom = this.confirmDeleteRoom.bind(this);
    this.handleOpenDialog = this.handleOpenDialog.bind(this);
    this.handleCloseDialog = this.handleCloseDialog.bind(this);
    this.resetForm = this.resetForm.bind(this);
  }

  componentDidMount() {
    this.getRooms();
  }

  getRooms = async () => {
    const data = await RoomServices.getRooms();
    console.log(data);
    if (data) {
      this.setState({ rooms: data.data });
    }
  }

  resetForm() {
    this.setState({
      selected: null,
      ...defaultRoom,
    });
  }

  addRoom = async () => {
    try {
      const { name, number_of_blank_dorm, status, selected } = this.state;
      if (selected._id) {
        const data = await RoomServices.updateRoom(selected._id, {
          name,
          number_of_blank_dorm: number_of_blank_dorm.value,
          status: status.value,
        });

        console.log(data);
        if (data) {
          this.handleCloseDialog();
          this.getRooms();
          Swal.fire({
            title: 'Thành công!',
            text: 'Cập nhật phòng thành công.',
            type: 'success',
            confirmButtonText: 'OK'
          });
          return false;
        }
      }
      const data = await RoomServices.addRoom({
        name,
        number_of_blank_dorm: number_of_blank_dorm.value,
        status: status.value,
      });

      console.log(data);
      if (data) {
        this.handleCloseDialog();
        this.getRooms();
        Swal.fire({
          title: 'Thành công!',
          text: 'Thêm phòng thành công.',
          type: 'success',
          confirmButtonText: 'OK'
        })
      }
    } catch (e) {
      console.log(e);
      this.handleCloseDialog();
      Swal.fire({
        title: 'Đã xảy ra lỗi!',
        text: 'Vui lòng kiểm tra thông tin và thử lại',
        type: 'error',
        confirmButtonText: 'OK'
      })
    }
  }

  deleteRoom = async (index) => {
    const { rooms } = this.state;
    const room = rooms[index];
    const count = await RoomServices.deleteRoom(room._id);
    if (count) {
      rooms.splice(index, 1);
      this.setState({ rooms }, () => {
        Swal.fire(
          'Deleted!',
          'Your room has been deleted.',
          'success',
        );
      });
    }
  }

  confirmDeleteRoom = async (index) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this room!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
    }).then((result) => {
      if (result.value) {
        this.deleteUser(index);
      }
    });
  }

  handleOpenDialog(selected) {
    let room = defaultRoom;
    
    if (selected) {
      const { name, number_of_blank_dorm, status } = selected;
      room = {
        name,
        number_of_blank_dorm: getDormOption(number_of_blank_dorm),
        status: getStatusOption(status),
      };
    }
    
    this.setState({
      selected,
      openDialog: true,
      ...room,
    });
  }

  handleCloseDialog() {
    this.setState({ selected: null, ...defaultRoom, openDialog: false });
  }

  handleChange(field, value) {
    let state = this.state;
    state[field] = value;
    this.setState(Object.assign({}, state));
  }

  render() {
    const { rooms, openDialog, selected, name, status, number_of_blank_dorm } = this.state;
    return (
      <AppLayout
        title="Quản lý phòng"
        topRightButton={(
          <Button onClick={this.handleOpenDialog}>
            Thêm phòng
          </Button>
        )}
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
                    Số phòng
                  </th>
                  <th>
                    Số giường trống
                  </th>
                  <th>
                    Trạng thái
                  </th>
                  <th />
                </tr>
                {rooms.length === 0 && (
                  <tr>
                    <td colSpan={5}>Không có dữ liệu</td>
                  </tr>
                )}
                {
                  rooms.map((room, key) => {
                    const {
                      _id: id, name, number_of_blank_dorm, status
                    } = room;
                    return (
                      <tr key={id}>
                        <td>
                          {key + 1}
                        </td>
                        <td>
                          {name || '-'}
                        </td>
                        <td>
                          {number_of_blank_dorm || '-'}
                        </td>
                        <td>
                          {status === 'not-full' ? 'Còn giường' : 'Hết giường'}
                        </td>
                        <td className="cell-actions">
                          <Button className="m-r-10" outline autoWidth onClick={() => this.handleOpenDialog(room)}>
                            Cập nhật
                          </Button>
                          <Button color="danger" className="m-r-10" outline autoWidth onClick={() => this.confirmDeleteRoom(key)}>
                            Xóa
                          </Button>
                        </td>
                      </tr>
                    );
                  })
                }
              </tbody>
            </table>
          </div>
        </Block>

        <Dialog scroll="body" maxWidth="md" open={openDialog} onClose={() => this.handleCloseDialog()} aria-labelledby="simple-dialog-title">
          <DialogTitle id="simple-dialog-title">Thêm phòng mới</DialogTitle>
          <DialogContent>
            <TextField
              label="Số phòng"
              onChange={(e) => this.handleChange('name', e.target.value)}
              value={name}
              required
            />
            <Select
              label="Trạng thái"
              onChange={(value) => this.handleChange('status', value)}
              options={[
                { label: 'Còn giường trống', value: 'not-full' },
                { label: 'Hết giường', value: 'full' },
              ]}
              value={status}
            />
            <Select
              label="Số giường còn trống"
              onChange={(value) => this.handleChange('number_of_blank_dorm', value)}
              options={[
                { label: '1 giường', value: 1 },
                { label: '2 giường', value: 2 },
                { label: '3 giường', value: 3 },
                { label: '4 giường', value: 4 },
              ]}
              value={number_of_blank_dorm}
              isDisabled={status.value === 'full'}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.addRoom()}>Thêm</Button>
            <Button onClick={() => this.handleCloseDialog()} color="light-grey">Đóng</Button>
          </DialogActions>
        </Dialog>
      </AppLayout>
    );
  }
}

export default authenticate(Rooms);
