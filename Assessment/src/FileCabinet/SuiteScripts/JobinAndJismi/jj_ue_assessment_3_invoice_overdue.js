/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 */
define(['N/log', 'N/record','N/search'],
    /**
 * @param{log} log
 * @param{record} record
 */
    (log, record,search) => {
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
        const invoiceSearch = search.create({
            type: search.Type.INVOICE,
            filters: [
                ['status', 'anyof', 'CustInvc:A']
                
            ],
            columns: [
                search.createColumn({ name: 'tranid', label: 'Document Number' }),
                search.createColumn({name:'entity',label:'customer name'}),
                //search.createColumn({name:'amountremainingtotalbox',label:'amount remaining'})
 
            ]
            
  
        });
            invoiceSearch.run().each(result => {
            const documentnumber = result.getValue('tranid');        
            const customername = result.getValue('entity');
           // const amount = result.getValue('amountremainingtotalbox');
             log.debug('Saved search created',`document no : ${documentnumber},customer name :${customername}`);
            return true; 
            

        });

    } catch (e) {
        log.error('Error Running Invoice Search',e.message 
        );
    }

        }

        return {beforeLoad, beforeSubmit, afterSubmit}

    });
