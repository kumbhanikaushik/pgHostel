// import { call, put, takeLatest } from 'redux-saga/effects';
// import axios from 'axios';
// import { GET_DATA_WATCHER } from '../../constant';
// import { getDataFaliure, getDataSuccess } from '../../action';

// function* onGetData(action) {

//   async function callApi() {

//     const { payload } = action;

//     try {
//       const response = await axios.post(
//         'https://api.housivity.com/api/v1/property?city=Gandhinagar&projectType=[%22pgHostel%22]&page=1', null,
//         {
//           headers: {
//             Authorization: `Bearer ${payload.accessToken}`
//           }
//         }
//       );
//       console.log('>>>>>>>>>>>',response);
//       if (response.data.success) {
//         console.log('=-=-=-=-=',response.data.data);
//         return { response: response.data.data };
//       } else {
//         return { error: response.data };
//       }
//     } catch (error) {
//       return { error };
//     }
//   }

//   const { response, error } = yield call(callApi);

//   if (response) {
//     yield put(getDataSuccess(response));
//   } else {
//     yield put(getDataFaliure(error));
//   }
// }

// export function* getDataActionWatcher() {
//   yield takeLatest(GET_DATA_WATCHER, onGetData);
// }



import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { GET_DATA_WATCHER } from '../../constant';
import { getDataFailure, getDataSuccess } from '../../action';

function* onGetData(action) {

  const callApi = async () => {
    const { payload } = action;

    try {
      const response = await axios.get('https://api.housivity.com/api/v1/property', {
        params: {
          city: 'Gandhinagar',
          projectType: '["pgHostel"]',
          page: 1
        },
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${payload.accessToken}`
        },
      });

      if (response.data) {
        return { response: response.data };
      } else {
        return { error: response.data };
      }
    } catch (error) {
      return { error: error.response ? error.response.data : error.message };
    }
  };

  const { response, error } = yield call(callApi);

  if (response) {
    yield put(getDataSuccess(response));
  } else {
    yield put(getDataFailure(error));
  }
}

export function* getDataActionWatcher() {
  yield takeLatest(GET_DATA_WATCHER, onGetData);
}


// import { call, put, takeLatest } from 'redux-saga/effects';
// import { GET_DATA_WATCHER } from '../../constant';
// import { getDataFailure, getDataSuccess } from '../../action';

// function* onGetData(action) {

//   const callApi = async () => {
//     const { payload } = action;

//     try {
//       const response = await fetch('https://api.housivity.com/api/v1/property?city=Gandhinagar&projectType=[%22pgHostel%22]&page=1', {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${payload.accessToken}`
//         },
//       });

//       const data = await response.json();
//       if (data) {
//         return { response: data };
//       } else {
//         return { error: data };
//       }
//       // console.log('datadata',data.success);
//       // if (data.success) {
//       //   console.log('=-=-=-=-=', data.data);
//       //   // return { response: data.data };
//       // } else {
//       //   return { error: data };
//       // }
//     } catch (error) {
//       return { error };
//     }
//   };

//   const { response, error } = yield call(callApi);

//   if (response) {
//     yield put(getDataSuccess(response));
//   } else {
//     yield put(getDataFailure(error));
//   }
// }

// export function* getDataActionWatcher() {
//   yield takeLatest(GET_DATA_WATCHER, onGetData);
// }
