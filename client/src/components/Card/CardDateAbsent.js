import React from 'react';
import moment from 'moment';
import {View, SafeAreaView} from 'react-native';
import {Calendar} from 'react-native-calendars';
import color from '../../utils/color';
import {LocaleConfig} from 'react-native-calendars';

LocaleConfig.locales['id'] = {
  monthNames: [
    'Januari',
    'Februari',
    'Maret',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Agustus',
    'September',
    'Oktober',
    'November',
    'Desember',
  ],
  monthNamesShort: [
    'Janv.',
    'Févr.',
    'Mars',
    'Avril',
    'Mai',
    'Juin',
    'Juil.',
    'Août',
    'Sept.',
    'Oct.',
    'Nov.',
    'Déc.',
  ],
  dayNames: ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'],
  dayNamesShort: ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'],
  today: 'Hari Ini',
};
LocaleConfig.defaultLocale = 'id';

const _format = 'YYYY-MM-DD';
const _today = moment().format(_format);

export default class CardDateAbsent extends React.Component {
  constructor() {
    super();

    this.state = {
      _markedDates: {},
    };
  }

  toDateString(day) {
    return moment(day.dateString).format(_format);
  }

  componentWillMount() {
    console.log(this.props.data);
    let obj;
    for (var i = 0; i < this.props.data.length; i++) {
      obj = Object.assign(this.state._markedDates, {
        [this.props.data[i].masuk_absen.split(' ')[0]]: {
          selected: true,
          selectedColor:
            this.props.data[i].ket == 'A' ? color.red : color.secondary,
        },
      });
    }
    this.setState({_markedDates: obj});
  }

  render() {
    return (
      <Calendar
        current={Date.now()}
        markedDates={this.state._markedDates}
        monthFormat={'MMMM yyyy'}
        hideArrows={true}
        disableMonthChange={true}
        disableArrowLeft={true}
        disableArrowRight={true}
        theme={{
          backgroundColor: color.white,
          calendarBackground: color.white,
          dayTextColor: color.primary,
          textDayFontFamily: 'SFPro-Regular',
          'stylesheet.calendar.header': {
            week: {
              flexDirection: 'row',
              justifyContent: 'space-around',
            },
            dayHeader: {
              color: color.primary,
              fontFamily: 'SFPro-SemiBold',
              textTransform: 'uppercase',
              marginBottom: 10,
              width: 34,
              textAlign: 'center',
            },
          },
        }}
      />
    );
  }
}
