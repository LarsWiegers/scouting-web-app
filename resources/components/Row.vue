<template>
    <tr>
        <td><textarea type="text" v-model="text"></textarea></td>
        <td class="td-actions text-right">
            <button type="button" rel="tooltip" title="" v-on:click.stop="remove" class="btn btn-danger btn-simple btn-link" data-original-title="verwijder">
                <i class="fa fa-times"></i>
            </button>
        </td>
    </tr>
</template>
<style lang="scss" scoped>
    tr {
        width: 100%;
        margin-bottom: 16px;
        @media screen and (max-width: 700px) {
            display:flex;
            flex-direction: column;
        td {
            width: 100%;
            text-align: center;
        }
        }
    }

    td {
        padding: 15px;
    }
    textarea {
        border:1px solid #f7f7f7;
        width: 100%;
        min-height:120px;
    }
</style>
<script>
    export default {
        name: 'row',
        props: ['alreadyDefinedText'],
        data ()  {
            return {
                text : 'Klik op mij om me aan te passen'
            }
        },
        watch: {
            text: function (newText, oldText) {
               this.$emit('textChanged', {
                   newText: newText,
                   oldText: oldText
               })
            },
        },
        mounted() {
            console.log('Component mounted.');
            this.$emit('textChanged', {
                newText: this.text,
                oldText: ""
            })
        },
        methods: {
            remove() {
                this.$emit('remove');
            }
        }
    }
</script>
