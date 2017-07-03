import moment from 'moment'

export default class Cell {
  constructor(date) {
    this.date = moment(date)
  }

  render(name = "") {
    return { date: this.date, week: this.weekOfMonth(), day: this.dayOfWeek(), name: name }
  }

  weekOfMonth() {
    return this.date.week() - moment(this.date).startOf('month').week() + 1;
  }

  dayOfWeek() {
    return this.date.isoWeekday();
  }

  holidays() {
    const an = this.date.year()
    const JourAn = new Date(an, "00", "01")
    const FeteTravail = new Date(an, "04", "01")
    const Victoire1945 = new Date(an, "04", "08")
    const FeteNationale = new Date(an, "06", "14")
    const Assomption = new Date(an, "07", "15")
    const Toussaint = new Date(an, "10", "01")
    const Armistice = new Date(an, "10", "11")
    const Noel = new Date(an, "11", "25")
    const SaintEtienne = new Date(an, "11", "26")

    const G = an % 19
    const C = Math.floor(an / 100)
    const H = (C - Math.floor(C / 4) - Math.floor((8 * C + 13) / 25) + 19 * G + 15) % 30
    const I = H - Math.floor(H / 28) * (1 - Math.floor(H / 28) * Math.floor(29 / (H + 1)) * Math.floor((21 - G) / 11))
    const J = (an * 1 + Math.floor(an / 4) + I + 2 - C + Math.floor(C / 4)) % 7
    const L = I - J
    const MoisPaques = 3 + Math.floor((L + 40) / 44)
    const JourPaques = L + 28 - 31 * Math.floor(MoisPaques / 4)
    const Paques = new Date(an, MoisPaques - 1, JourPaques)
    const VendrediSaint = new Date(an, MoisPaques - 1, JourPaques - 2)
    const LundiPaques = new Date(an, MoisPaques - 1, JourPaques + 1)
    const Ascension = new Date(an, MoisPaques - 1, JourPaques + 39)
    const Pentecote = new Date(an, MoisPaques - 1, JourPaques + 49)
    const LundiPentecote = new Date(an, MoisPaques - 1, JourPaques + 50)

    return new Array(new Cell(JourAn).render('Jour de l\'an'), new Cell(Paques).render('Pâques'), new Cell(LundiPaques).render('Lundi de Pâques'), new Cell(FeteTravail).render('Fête du travail'), new Cell(Victoire1945).render('Victoire 1945'), new Cell(Ascension).render('Ascension'), new Cell(Pentecote).render('Pentecôte'), new Cell(LundiPentecote).render('Lundi de Pentecôte'), new Cell(FeteNationale).render('Fête nationale'), new Cell(Assomption).render('Asomption'), new Cell(Toussaint).render('Toussaint'), new Cell(Armistice).render('Armistice'), new Cell(Noel).render('Noël')).sort((a, b) => a.date > b.date)
  }
}
