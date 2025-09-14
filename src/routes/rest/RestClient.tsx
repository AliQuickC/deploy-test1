'use client';

import s from './route.module.sass';
import { useEffect, useState } from 'react';
import {
  useActionData,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
  useSubmit,
} from 'react-router';
import {
  base64UrlDecode,
  base64UrlEncode,
  headerParamsToURL,
  urlSearchParamsToString,
} from './utils';
import { initialState as responseInitial } from '../../redux/slice/responseSlice';
import { useActions } from '../../redux/useActions';
import { ResponseInfo } from '../../components/ResponseInfo/ResponseInfo';

export default function Rest() {
  const { setResponse } = useActions();

  const submit = useSubmit();
  const actionData = useActionData<{
    ok?: boolean;
    endpoint?: string;
    method?: string;
    timestamp?: Date;
    duration?: string;
    requestSize?: string;
    responseSize?: string;
    responseCode: number;
    data?: Response;
    errorDetails: { message: string } | undefined;
  }>();

  const navigate = useNavigate();
  const location = useLocation();

  const params = useParams();
  const [searchParams] = useSearchParams();

  const [url, setUrl] = useState('https://www.swapi.tech/api/starships/');
  const [method, setMethod] = useState('GET');
  const [body, setBody] = useState(
    '{"title":"fakeTitle","userId":1,"body":"fakeMessage"}'
  );
  const [headers, setHeaders] = useState('{"Content-Type":"application/json"}');

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append('url', url);
    formData.append('method', method);
    formData.append('headers', headers);
    if (body !== 'GET') {
      formData.append('body', body);
    }

    submit(formData, { method: 'post', action: '/rest' });
  };

  const handlerGetParamsFromUrl = () => {
    if (!params) {
      return;
    }
    const keys: string[] = Object.keys(params);
    if (keys.length === 0 || !params.method) {
      return;
    }
    setMethod(params.method);
    setUrl(base64UrlDecode(params?.encodedEndpoint || ''));
    setBody(base64UrlDecode(params?.encodedBody || ''));
    setHeaders(urlSearchParamsToString(searchParams.toString()));
  };

  const getEncodeUrl = (): string => {
    const encodedUrl = base64UrlEncode(url);

    const encodeBody =
      body && method !== 'GET' ? '/' + base64UrlEncode(body) : '';

    const str = `/rest/${method}/${encodedUrl}${encodeBody}${headerParamsToURL(headers)}`;
    return str;
  };

  const handlerSetUrl = () => {
    navigate(getEncodeUrl(), { replace: true });
  };

  useEffect(() => {
    handlerGetParamsFromUrl();
    // eslint-disable-next-line react-compiler/react-compiler
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  useEffect(() => {
    if (actionData && actionData?.timestamp?.getTime()) {
      handlerSetUrl();
    }
    // eslint-disable-next-line react-compiler/react-compiler
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actionData?.timestamp]);

  useEffect(() => {
    if (actionData) {
      const responseCode = actionData.responseCode || 0;
      const errorDetails = actionData.errorDetails
        ? typeof actionData.errorDetails === 'string'
          ? actionData.errorDetails
          : actionData.errorDetails.message || ''
        : 'N/A';
      const duration = actionData.duration
        ? String(actionData.duration) + ' ms'
        : 'N/A';
      const responseSize = actionData.responseSize
        ? String(actionData.responseSize) + ' kb'
        : 'N/A';

      const analitics = {
        responseCode,
        duration,
        timestamp: actionData.timestamp
          ? String(actionData.timestamp.getTime())
          : 'N/A',
        method: actionData.method || 'N/A',
        requestSize: actionData.requestSize
          ? String(actionData.requestSize) + ' kb'
          : 'N/A',
        responseSize,
        errorDetails,
        endpoint: actionData.endpoint ? String(actionData.endpoint) : 'N/A',
        linkToRestClient: getEncodeUrl(),
      };

      const responseInfo = {
        responseCode,
        data: JSON.stringify(actionData?.data) || '',
        duration,
        responseSize,
      };

      setResponse({
        responseInfo,
        analitics,
      });
    }
    // eslint-disable-next-line react-compiler/react-compiler
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actionData]);

  return (
    <main>
      <div className="container">
        <fieldset className={s.requestClient}>
          <legend>REST Client</legend>
          <div className={s.requestParamsWrap}>
            <div className={s.requestParams}>
              <select
                className={s.method}
                name="method"
                id="method"
                value={method}
                onChange={(e) => setMethod(e.target.value)}
              >
                <option className={s.selectGet} value="GET">
                  GET
                </option>
                <option className={s.selectPost} value="POST">
                  POST
                </option>
                <option className={s.selectPut} value="PUT">
                  PUT
                </option>
                <option className={s.selectPatch} value="PATCH">
                  PATCH
                </option>
                <option className={s.selectDelete} value="DELETE">
                  DELETE
                </option>
                <option className={s.selectHead} value="HEAD">
                  HEAD
                </option>
                <option className={s.selectOption} value="OPTION">
                  OPTION
                </option>
              </select>

              <input
                className={s.url}
                type="text"
                name="url"
                id="url"
                placeholder="Enter URL or paste text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </div>

            <button
              onClick={() => {
                setResponse(responseInitial);
                handleSubmit();
              }}
            >
              Send
            </button>
          </div>

          <div className={s.requestData}>
            <div className={s.requestDataItem}>
              <label>Request Header:</label>
              <textarea
                className={s.requestHeader}
                value={headers}
                onChange={(e) => setHeaders(e.target.value)}
              />
            </div>

            <div className={s.requestDataItem}>
              <label>Request Body:</label>
              <textarea
                className={s.jsonBody}
                value={body}
                onChange={(e) => setBody(e.target.value)}
              />
            </div>
          </div>
        </fieldset>

        <ResponseInfo />
      </div>
    </main>
  );
}
