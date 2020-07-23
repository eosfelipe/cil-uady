import config from './firebase';
/* FUNCTIONS FIREBASE */
firebase.initializeApp(config);
const db = firebase.database();
/* END */

const Api = {
    END_POINT_CONTACT: 'https://script.google.com/macros/s/AKfycbwav1RSD0XeugXF8NFmMRuUpNK1_SqVcv2oVadzb_W9aSpPu8g/exec?',

    getSnapshot: (page) => db.ref(`/${page}/`).once('value')
}

export default Api;