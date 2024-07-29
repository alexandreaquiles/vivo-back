import moment from 'moment';
moment.locale('pt');

const criacaoNode = moment('2009-05-27')
                        .fromNow();

export default criacaoNode;