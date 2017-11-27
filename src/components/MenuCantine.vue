<template>
    <section class="section">
        <div class="container">
            <div class="form" @keyup.enter="addMenu" @keyup.esc="cancelMenu">
                <div class="field">
                    <label class="label">Nom</label>
                    <div class="control">
                        <input type="text" v-model="menu.nom" class="input" id="nom" required>
                    </div>
                    <p class="help is-danger">Ce champ est obligatoire</p>
                </div>
                <div class="field">
                    <label class="label">Entrée</label>
                    <div class="control"><input v-model="menu.entree" type="text" class="input" required></div>
                </div>
                <div class="field">
                    <label class="label">Plat</label>
                    <div class="control"><input v-model="menu.plat" type="text" class="input" required></div>
                </div>
                <div class="field">
                    <label class="label">Dessert</label>
                    <div class="control"><input v-model="menu.dessert" type="text" class="input" required></div>
                </div>
                <div class="field is-grouped">
                    <div class="control">
                        <button @click.prevent="addMenu" class="button is-primary">Submit</button>
                    </div>
                    <div class="control" v-show="isEditing">
                        <button @click.prevent="cancelMenu" class="button is-link">Cancel</button>
                    </div>
                </div>
            </div>
        </div>
        <section class="section">
            <div class="columns is-multiline is-mobile">
                <div class="column is-12-desktop is-one-third-tablet is-one-quarter-mobile is-one-third" v-for="({nom, entree, plat, dessert}, index) in menus" :key="index" @click.prevent="editMenu(nom, index)">
                    <card-menu :nom="nom" :entree="entree" :plat="plat" :dessert="dessert" @deleteMenu="deleteMenu" :class="{'is-danger-card': currentMenu === index}"></card-menu>
                </div>
            </div>
        </section>
    </section>
</template>


<script>
import moment from 'moment'
import CardMenu from './CardMenu'

export default {
    created() {
        this.saveInterval = setInterval(this._save, 1000)
    },
    destroyed() {
        clearInterval(this.saveInterval)
    },
    mounted() {
        if (sessionStorage.getItem("menus")) {
            this.menus = JSON.parse(sessionStorage.getItem("menus"))
        }
    },
    data() {
        return {
            saveInterval: null,
            menus: [],
            attemptSubmit: false,
            currentMenu: 0,
            menu: {
                nom: '',
                entree: '',
                plat: '',
                dessert: '',
                date: moment()
            }
        }
    },
    components: { CardMenu },
    computed: {
        isEditing() {
            return Object.values(this.menu).some(x => typeof x === "string" && x !== '')
        }

    },
    methods: {

        addMenu() {
            if (!this._checkForm()) {
                this.menus.push(Object.assign({}, this.menu))
                this._resetMenu()
            }
        },

        deleteMenu(payload) {
            this.menus = this.menus.filter(menu => menu.nom !== payload.nom)
        },

        cancelMenu() {
            this._resetMenu()
        },

        editMenu(nom, index) {
            this.currentMenu = index
            this.menu = Object.assign({}, this.menus.find(menu => menu.nom === nom))
        },

        _checkForm() {
            const toto = Array.prototype.slice.call(document.querySelectorAll(".form input"))
            toto.forEach(item => {

                if (!item.checkValidity())
                    item.classList.add("is-danger")
                else 
                    if(item.classList.contains('is-danger')) {
                        item.classList.remove('is-danger')
                    }
            })
        },

        _resetMenu() {
            Object.keys(this.menu).forEach(key => {
                this.menu[key] = ''
            })
            this.menu.date = moment()
            document.getElementById("nom").focus()
            this.currentMenu = 0

            //  const toto = Array.prototype.slice.call(document.querySelectorAll(".form input"))
            // toto.forEach(item => { item.classList.remove('is-danger')})
        },

        _save() {

            if (this.menus.length > 0) {
                sessionStorage.setItem("menus", JSON.stringify(this.menus))
                sessionStorage.setItem("horodatage", moment())
            }
            else {
                sessionStorage.clear()
            }
        }
    }
}
</script>

<style>
.is-danger-card {
    color: red;
}
</style>

