<template>
    <tr class="row">
        <td>
            <div class="form-check">
                <label class="form-check-label">
                    <input class="form-check-input" type="checkbox" value="">
                    <span class="form-check-sign"></span>
                </label>
            </div>
        </td>
        <td>Sign contract for "What are conference organizers afraid of?"</td>
        <td class="td-actions text-right">
            <button type="button" rel="tooltip" title="" class="btn btn-info btn-simple btn-link" data-original-title="Edit Task">
                <i class="fa fa-edit"></i>
            </button>
            <button type="button" rel="tooltip" title="" class="btn btn-danger btn-simple btn-link" data-original-title="Remove">
                <i class="fa fa-times"></i>
            </button>
        </td>
    </tr>
</template>

<script>
    export default {
        mounted() {
            console.log('Component test.')
        }
    }
</script>
