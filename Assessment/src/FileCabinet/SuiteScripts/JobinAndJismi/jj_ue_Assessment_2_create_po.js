/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 */
define(['N/log', 'N/record'],
    /**
 * @param{log} log
 * @param{record} record
 */
    (log, record) => {
        /**
         * Defines the function definition that is executed before record is loaded.
         * @param {Object} scriptContext
         * @param {Record} scriptContext.newRecord - New record
         * @param {string} scriptContext.type - Trigger type; use values from the context.UserEventType enum
         * @param {Form} scriptContext.form - Current form
         * @param {ServletRequest} scriptContext.request - HTTP request information sent from the browser for a client action only.
         * @since 2015.2
         */
        const beforeLoad = (scriptContext) => {

        }

        /**
         * Defines the function definition that is executed before record is submitted.
         * @param {Object} scriptContext
         * @param {Record} scriptContext.newRecord - New record
         * @param {Record} scriptContext.oldRecord - Old record
         * @param {string} scriptContext.type - Trigger type; use values from the context.UserEventType enum
         * @since 2015.2
         */
        const beforeSubmit = (scriptContext) => {

        }

        /**
         * Defines the function definition that is executed after record is submitted.
         * @param {Object} scriptContext
         * @param {Record} scriptContext.newRecord - New record
         * @param {Record} scriptContext.oldRecord - Old record
         * @param {string} scriptContext.type - Trigger type; use values from the context.UserEventType enum
         * @since 2015.2
         */
        const afterSubmit = (scriptContext) => {
              try {
       
        const purchaseOrder = record.create({
            type: record.Type.PURCHASE_ORDER,
            isDynamic: true
        });

        
        purchaseOrder.setValue({
            fieldId: 'entity',
            value: 7157  
        });

        
        purchaseOrder.setValue({
            fieldId: 'trandate',
            value: new Date()
        });

        purchaseOrder.setValue({
         fieldId: 'location',
         value: 72  
        });


        purchaseOrder.selectNewLine({
            sublistId: 'item'
        });

        purchaseOrder.setCurrentSublistValue({
            sublistId: 'item',
            fieldId: 'item',
            value: 3680  
        });

        purchaseOrder.setCurrentSublistValue({
            sublistId: 'item',
            fieldId: 'quantity',
            value: 10
        });

        purchaseOrder.setCurrentSublistValue({
            sublistId: 'item',
            fieldId: 'rate',
            value: 50.00
        });

        purchaseOrder.commitLine({
            sublistId: 'item'
        });

       
        const purchaseOrderId = purchaseOrder.save();

        log.debug({
            title: 'Purchase Order Created',
            details: 'Internal ID: ' + purchaseOrderId
        });

    } catch (e) {
        log.error('Error Creating Purchase Order',e.message );
    }

        }

        return {beforeLoad, beforeSubmit, afterSubmit}

    });
