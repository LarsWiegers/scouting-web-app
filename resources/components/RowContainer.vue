<template>
    <div>
        <button type="button" rel="tooltip" title="" v-on:click="addNew" class="btn btn-primary">
            <i class="fa fa-plus"></i> Toevoegen
        </button>
        <button type="button" rel="tooltip" title="" v-on:click="save" class="btn btn-primary">
            <i class="fa fa-save"></i> Opslaan
        </button>
        <table class="table-full-width">
            <tbody>
            <tr is="row" v-for="(item, index) in dataSet" :key="item.id" v-on:textChanged="textChange" v-on:remove="remove(index)"></tr>
            </tbody>
        </table>
        <form class="hidden" method="post" v-bind:action="actionUrl">
            <input type="hidden" name="ideas" v-bind:value="item" v-for="(item, index) in dataSet">
        </form>
    </div>
</template>
<style lang="scss" scoped>
    table, tbody {
        width:100%;
    }
    button {
        float: right;
        margin-top: -45px;
        &:nth-child(2) {
            margin-right: 145px;
        }
    }
</style>
<script>
    export default {
        name: 'rowContainer',
        props: ['propData', 'listId'],
        data ()  {
            return {
                dataSet: [],
                actionUrl: null
            }
        },
        mounted() {
            this.actionUrl = '/ideas/' + this.listId + '/add';
        },
        methods: {
            textChange (data) {
                const {oldText, newText} = data;
                const self = this;
                this.dataSet.forEach(function(data, index) {
                    console.log(data, index, oldText, newText);
                    if(data === oldText) {
                        self.dataSet[index] = newText;
                    }
                });
            },
            remove(index) {
                console.log(index, this.$children);
                this.dataSet.splice(index, 1);
            },
            addNew() {
                this.dataSet.push("");
            },
            save() {
                this.$el.querySelector('form').submit();
            }
        }
    }
</script>
