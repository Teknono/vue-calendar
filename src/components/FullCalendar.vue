<template>
  <div>
    <div class="container">
      <nav class="nav">
        <div class="nav-left">
          <div class="field has-addons">
            <p class="control">
              <a class="button" @click="rewindMonth">
                <span class="icon is-small">
                  <i class="fa fa-backward"></i>
                </span>
                <span>Précédent</span>
              </a>
            </p>
            <p class="control">
              <a class="button" @click="today">
                <span class="icon is-small">
                  <i class="fa fa-calendar-check-o"></i>
                </span>
                <span>Aujourd'hui</span>
              </a>
            </p>
            <p class="control">
              <a class="button" @click="forwardMonth">
                <span>Suivant</span>
                <span class="icon is-small">
                  <i class="fa fa-forward"></i>
                </span>
              </a>
            </p>
          </div>

        </div>
        <div class="nav-center">
          <p>
            <strong @click="changeMonth" v-if="!isChangeMonth">{{startDate.add(1,'day').format("MMMM YYYY") }}</strong>
            <select v-else v-model="month" @change="changeMonth">
              <option v-for="m in months" :value="months.indexOf(m)" :key="m">{{m}}</option>
            </select>
            <!--<input type="number"  id="changeMonth" @keyup.enter="changeMonth" @keyup.tab="changeMonth"  v-model="month">-->
          </p>
        </div>
        <div class="nav-right">
        </div>
      </nav>
    </div>
    <div class="calendar">
      <div class="header">
        <div v-for="day in days" :key="day" class=days>{{day}}</div>
      </div>
      <div class="week" v-for="n in 6" :key="n">
        <div class="day" v-for="d in 7" :key="d" @click="openEvent"></div>
      </div>
    </div>
    <LayoutModal>
      <ContentModal></ContentModal>
    </LayoutModal>
  </div>
</template>

<script>
require("normalize-css")
import moment from 'moment'
import LayoutModal from './LayoutModal'
import ContentModal  from './ContentModal'
import Cell from '../utils/Cell.js'

var locale = window.navigator.userLanguage || window.navigator.language;
if (locale)
  moment.locale(locale)

export default {
  name: 'FullCalendar',
  created() {
    moment.locale('fr')
  },
  mounted() {
    this.render
    this.customizeWeekEnd()

    // document.querySelectorAll(".week .day").forEach((cell, index) => {
    //   if (this.getFirstCell.week === Math.floor(index / 7) + 1 && this.getFirstCell.day === (index) % 7 + 1)
    //     cell.innerHTML = "Je suis le premier jour"

    //   if (this.getLastCell.week === Math.floor(index / 7) + 1 && this.getLastCell.day === (index) % 7 + 1)
    //     cell.innerHTML = "Je suis le dernier jour"

    //   if (this.getCurrentCell.week === Math.floor(index / 7) + 1 && this.getCurrentCell.day === (index) % 7 + 1) {
    //     cell.className += " current"
    //     cell.innerHTML = "Je suis le jour courant"
    //   }


    //   console.log(cell, { week: Math.floor(index / 7) + 1, day: (index) % 7 + 1 });
    // })
  },
  components: {
    LayoutModal, ContentModal
  },
  data() {
    return {
      days: ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"],
      year: moment().year(),
      month: moment().month(),
      months: moment.months(),
      className: "calendar-number",
      weekdays: moment.weekdays(),
      isChangeMonth: false,
      holidays: new Cell(new Date()).holidays(),
      daysInCalendar: {}
    }
  },
  watch: {
    month() {
      this.render
      this.getHolidaysInMonth
    },
    year() {
      this.holidays = new Cell(moment([this.year, this.month, 1])).holidays()
    }
  },
  computed: {
    moment() {
      return moment([this.year, this.month])
    },
    startDate() {
      return this.moment.startOf('month')
    },
    getFirstCell() {
      return new Cell(this.startDate).render()
    },
    getCurrentCell() {
      return new Cell(moment()).render()
    },
    getDayInCurrentMonth() {
      return this.moment.daysInMonth();
    },
    getHolidaysInMonth() {
      return this.holidays.filter(holiday => holiday.date.month() === this.month)
    },
    render() {
      this.daysInCalendar = document.querySelectorAll(".week .day")
      this.clearCalendar()
      this.fillMonthCalendar()
      this.fillNextMonthCalendar()
      this.fillPreviousMonthCalendar()
      this.fillMonthHolidays()
      this.markupCurrentDay()
    }
  },
  methods: {
    fillMonthCalendar() {
      for (let day = 0; day < this.getDayInCurrentMonth; day++) {
        const index = day + this.getFirstCell.day - 1
        this.daysInCalendar[index].appendChild(this.createSpanElement(day + 1, this.className))
      }
    },
    fillPreviousMonthCalendar() {
      let previousMonth = this.moment.add(-1, 'month').endOf('month').date()
      for (let day = this.getFirstCell.day; day > -1; day--) {
        if (this.daysInCalendar[day - 2]) {
          this.daysInCalendar[day - 2].appendChild(this.createSpanElement(previousMonth, "calendar-number-out"))
          previousMonth--
        }
      }
    },
    fillNextMonthCalendar() {
      for (let day = this.getDayInCurrentMonth; day < this.daysInCalendar.length; day++) {
        const index = day + this.getFirstCell.day - 1
        if (this.daysInCalendar[index])
          this.daysInCalendar[index].appendChild(this.createSpanElement(day - this.getDayInCurrentMonth + 1, "calendar-number-out"))
      }
    },
    clearHolidays() {
      const el = document.querySelector("div.day span.tag")
      if (el) {
        el.classList.remove('tag')
        el.classList.remove('is-primary')
      }
    },
    fillMonthHolidays() {
      this.getHolidaysInMonth.forEach(holiday => {
        const selector = `.week:nth-child(${holiday.week + 1}) .day:nth-child(${holiday.day}) span`
        const el = document.querySelector(selector)
        el.classList.add("tag")
        el.classList.add("is-primary")
        el.innerHTML += " " + holiday.name
      })
    },
    customizeWeekEnd() {
      const selector = document.querySelectorAll(".day:nth-child(6), .day:nth-child(7)").forEach(day => {
        day.classList.add('week-end')
      })
    },
    markupCurrentDay() {
      if (this.month === moment().month() && this.year === moment().year()) {
        const selector = `.week:nth-child(${this.getCurrentCell.week + 1}) .day:nth-child(${this.getCurrentCell.day})`
        document.querySelector(selector).classList.add("current")
      } else {
        const el = document.querySelector("div.day.current")
        if (el) {
          el.classList.remove('current')
        }
      }
    },
    createSpanElement(innerHtml, clasName) {
      const span = document.createElement("span")
      span.className = clasName
      span.innerHTML = innerHtml
      return span
    },
    clearCalendar() {
      document.querySelectorAll("span.calendar-number-out, span.calendar-number").forEach(span => {
        span.parentNode.removeChild(span)
      })
      this.clearHolidays()
    },
    today() {
      this.month = new Date().getMonth()
      this.year = moment().year()
      this.holidays = new Cell(new Date()).holidays()
    },
    forwardMonth() {
      if (this.month === 11) {
        this.month = 0
        this.year++
        this.holidays = new Cell(new Date()).holidays()
      } else {
        this.month++
      }
    },
    rewindMonth() {
      if (this.month === 0) {
        this.month = 11
        this.year--
        this.holidays = new Cell(new Date()).holidays()
      } else {
        this.month--
      }
    },
    changeMonth() {
      this.isChangeMonth = !this.isChangeMonth
    },
    openEvent() {
      this.$store.commit('toggleModal')
    }
  }
}
</script>

<style lang="scss">
@import "./node_modules/bulma/sass/utilities/initial-variables";
$calendar-color: #e0e0e0;
$day-out: #b5b5b5;

span {
  .header {
    width: 100%;
    text-align: center;
  }
}

.calendar {
  display: flex;
  margin-top: 20px;
  flex-direction: column;

  .header {
    display: flex;
    border-top-style: solid;
    border-top-width: 1px;
    border-top-color: $calendar-color;

    .days {
      flex: 1;
      border-right: 1px solid $calendar-color;
      text-align: center;

      &:first-child {
        border-left: 1px solid $calendar-color;
      }
    }
  }

  .week {
    display: flex;

    &:last-child {
      border-bottom-color: $calendar-color;
      border-bottom-style: solid;
      border-bottom-width: 1px;
    }


    .day {
      flex: 1;
      display: flex;
      text-align: center;
      min-height: 109px;
      border-style: solid;
      border-color: $calendar-color;
      border-width: 1px 1px 0 0;

      &:first-child {
        border-left-width: 1px;
      }

      .calendar-number {
        font-size: 0.9em;
        margin-right: 5px;
        width: 100%;
        text-align: right;
        box-sizing: border-box;
      }

      .calendar-number-out {
        @extend .calendar-number;
        color: $day-out;
      }

      &:hover {
        background-color: $grey-lighter;
      }
    }

    .current {
      background-color: $white-ter
    }
  }
}
</style>

