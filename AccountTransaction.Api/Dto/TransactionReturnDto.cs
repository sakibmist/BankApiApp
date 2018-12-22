using System;

namespace AccountTransaction.Api.Dto
{
    public class TransactionReturnDto
    { 
        public long Id { get; set; }  
       
        public decimal CurrentBalance { get; set; } 
         
        public decimal ReceiveAmount { get; set; } 
        public decimal PaymentAmount { get; set; } 
        public DateTime TxnDateTime { get; set; }

        public string AccountNo { get; set; } 
        public long AccountId { get; set; }  

    }
}