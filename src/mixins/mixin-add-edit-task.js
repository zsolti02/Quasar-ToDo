export default{
    methods: {
        submitForm() {
            this.$refs.modalTaskName.$refs.name.validate()
            if (!this.$refs.modalTaskName.$refs.name.hasError) {
                this.submitTask()
            }
        },
    },
    components: {
        ModalHeader: require("components/Tasks/Modals/shared/ModalHeader.vue").default,
        ModalTaskName: require("components/Tasks/Modals/shared/ModalTaskName.vue").default,
        ModalTaskDetails: require("components/Tasks/Modals/shared/ModalTaskDetails.vue").default,
        ModalTaskDate: require("components/Tasks/Modals/shared/ModalTaskDate.vue").default,
        ModalTaskTime: require("components/Tasks/Modals/shared/ModalTaskTime.vue").default,
        ModalButtons: require("components/Tasks/Modals/shared/ModalButtons.vue").default
    }
}