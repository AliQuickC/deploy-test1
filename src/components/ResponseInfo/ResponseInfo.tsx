import s from './ResponseInfo.module.sass';
import classNames from 'classnames';
import { useResponseState } from '../../redux/useAppSelector';

function getResponseCodeStyle(code: number) {
  const codeFirstDigit = Math.round(code / 100);
  if (codeFirstDigit === 4 || codeFirstDigit === 5) {
    return classNames(s.responseCode, s.responseCodeFail);
  } else if (codeFirstDigit === 2) {
    return classNames(s.responseCode, s.responseCodeSuccess);
  }
  return s.responseCode;
}

export function ResponseInfo() {
  const { responseInfo } = useResponseState();

  return (
    <fieldset className={s.response}>
      <legend>Response</legend>

      <div className={s.responseInfo}>
        <label htmlFor="">
          Code:
          {responseInfo ? (
            <output className={getResponseCodeStyle(responseInfo.responseCode)}>
              {' '}
              {responseInfo.responseCode}
            </output>
          ) : (
            ''
          )}
        </label>

        {responseInfo ? <output>{responseInfo?.duration}</output> : ''}

        {responseInfo ? <output>{responseInfo?.responseSize}</output> : ''}
      </div>

      <div className={s.responseDataItem}>
        <label htmlFor="">Body:</label>
        <textarea
          className={s.jsonBody}
          value={responseInfo ? responseInfo?.data : ''}
          readOnly
        />
      </div>
    </fieldset>
  );
}
