/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 */
define(['N/log', 'N/record', 'N/search'],
    /**
 * @param{log} log
 * @param{record} record
 * @param{search} search
 */
    (log, record, search) => {
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
       try{ 
        const mysearch= search.create({
                type: search.Type.SALES_ORDER,
                title: 'My Second SalesOrder Search1',
                id: 'customsearch_my_second_so_search1',
                filters: [
                    search.createFilter({
                    name: 'status',
                    operator: search.Operator.IS,
                    values: 'SalesOrd:B'
                    }),
                    search.createFilter({
                    name: 'mainline',
                    operator: search.Operator.IS,
                    values: true
                    })
                ],
                columns: [
                    search.createColumn({
                    name: 'tranid'
                    }),
                    search.createColumn({
                    name: 'trandate'
                    }),
                    search.createColumn({
                    name: 'entity'
                    }),
                    search.createColumn({
                    name: 'subsidiary'
                    }),
                    search.createColumn({
                    name: 'total'
                    })
                ]
                });

       

           mysearch.run().each(result => {
            const documentnumber = result.getValue('tranid');
            const date = result.getValue('trandate');
            const customername = result.getValue('entity');
            const subsidiary = result.getValue('subsidiary');
            const amount = result.getValue('total');
             log.debug('Saved search created',`document no : ${documentnumber},date:${date},customer name :${customername},subsidiary : ${subsidiary},amount :${amount}`);
            return true; 
        });
    } catch (e) {
        log.error('Error Running ',e.message);
    }


              

 }

        return {beforeLoad, beforeSubmit, afterSubmit}

    });
    