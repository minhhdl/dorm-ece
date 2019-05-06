import React, { PureComponent } from 'react';
import { string } from 'prop-types';
import cn from 'classnames';
import s from './photoUploaderStyle.scss';

export default class PhotoUploader extends PureComponent {
  static propTypes = {
    label: string.isRequired,
  };

  constructor() {
    super();

    this.inputUpload = React.createRef();
    this.handleDrop = this.handleDrop.bind(this);
  }

  handleUploadFile = (e) => {
    e.preventDefault();
    const { handleUpload } = this.props;
    const { files } = e.target;
    if (files) handleUpload(files);
  };

  // Drag and Drop image handlers
  handleDrop(e) {
    e.stopPropagation();
    e.preventDefault();
    const { handleUpload } = this.props;
    const { files } = e.dataTransfer;
    if (files.length === 0) return false;
    handleUpload(files);
    return false;
  }

  _onDragEnter(e) {
    e.stopPropagation();
    e.preventDefault();
    return false;
  }

  _onDragOver(e) {
    e.preventDefault();
    e.stopPropagation();
    return false;
  }

  _onDragLeave(e) {
    e.stopPropagation();
    e.preventDefault();
    return false;
  }

  render() {
    const {
      label, preview, className, wrapperClassName, photoItemClassName,
      handleUpload, handleChange, onClick, ...other
    } = this.props;
    return (
      <div className={cn(s.photoUploader, className)} {...other}>
        {!onClick && (
          <input
            type="file"
            name="file"
            accept="image/*"
            id="company-create-upload"
            className={s.input}
            onChange={this.handleUploadFile}
            ref={this.inputUpload}
            multiple
          />
        )}
        <label
          className={s.lablePhotoUploader}
          htmlFor="company-create-upload"
          onDrop={this.handleDrop}
          onDragEnter={this._onDragEnter}
          onDragOver={this._onDragOver}
          onDragLeave={this._onDragLeave}
          onClick={onClick}
        >
          <i className="material-icons">
            add_a_photo
          </i>
          {label}
          {preview && (
            <div className={s.preview}>
              <img src={preview} />
            </div>
          )}
        </label>
      </div>
    );
  }
}
