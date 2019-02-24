
class UI {
    constructor() {
      this.budgetFeedback = document.querySelector(".budget-feedback");
      this.expenseFeedback = document.querySelector(".expense-feedback");
      this.budgetForm = document.getElementById("budget-form");
      this.budgetInput = document.getElementById("budget-input");
      this.budgetAmount = document.getElementById("budget-amount");
      this.expenseAmount = document.getElementById("expense-amount");
      this.balance = document.getElementById("balance");
      this.balanceAmount = document.getElementById("balance-amount");
      this.expenseForm = document.getElementById("expense-form");
      this.expenseInput = document.getElementById("expense-input");
      this.amountInput = document.getElementById("amount-input");
      this.expenseList = document.getElementById("expense-list");
      this.itemList = [];
      this.itemID = 0;
    }

    submitBudgetForm() {
      const value = this.budgetInput.value;
        this.budgetAmount.textContent = value;
        this.budgetInput.value = '';
        this.showBalance();
    }  

     showBalance() {
       const expense = this.totalExpense();
       const total = parseInt(this.budgetAmount.textContent) - expense;
       this.balanceAmount.textContent = total;
       if (total < 0) {
         this.balance.classList.remove('showGreen', 'showBlack');
         this.balance.classListdd.add('showRed');
       }
       else if (total > 0) {
        this.balance.classList.remove('showRed', 'showBlack');
        this.balance.classListdd.add('showGreen');
      }
      else if (total === 0) {
        this.balance.classList.remove('showRed', 'showGreen');
        this.balance.classListdd.add('showBlack');
      }
     }

     //this is a submit expense form (Sam)
     submitExpenseForm() {
       const expenseValue = this.expenseInput.value;
       const amountValue = this.amountInput.value;

       if (expenseValue === '' || amountValue === '' || amountValue < 0) 
       {
         this.expenseFeedback.classList.add('showItem');
         this.expenseFeedback.innerHTML = `<p>values cannot be empty</p>`;
         const self = this;
        //  setTimeout(functon() {
        //     self.expenseFeedback.classList.remove('showItem');
        //  }, 3000);
        }
        else {
          let amount = parseInt(amountValue);
          this.expenseInput.value = '';
          this.amountInput.value = '';

          let expense = {
            id:this.itemID,
            title:expenseValue,
            amount:amount,
          }
          this.itemID++;
          this.itemList.push(expense);
          this.addExpense(expense);
          this.showBalance();
       
        }
     }

     addExpense(expense) {
       const div = document.createElement('div');
       div.classList.add('expense');
       div.innerHTML = `<div class="expense-item d-flex justify-content-between align-items-baseline">
       <h6 class="expense-title mb-0 text-uppercase list-item">-${expense.title}</h6>
       <h5 class="expense-amount mb-0 list-item">${expense.amount}</h5>
       <div class="expense-icons list-item">
        <a href="#" class="edit-icon mx-2" data-id="${expense.id}">
         <i class="fas fa-edit"></i>
        </a>
        <a href="#" class="delete-icon" data-id="${expense.id}">
         <i class="fas fa-trash"></i>
        </a>
       </div>
      </div>`;
      this.expenseList.appendChild(div);
     }

     totalExpense(){
       let total = 0;
       if (this.itemList.length > 0) {
        total = this.itemList.reduce((acc, curr) => {
          acc += curr.amount;
          return acc;
        },0);
       }
       this.expenseAmount.textContent = total
       return total;
     }
  } 



      function eventListeners() {
        const  budgetForm = document.getElementById('budget-form');
        const  expenseForm = document.getElementById('expense-form');
        const  expenseList = document.getElementById('expense-list');

        //this is going to be a new instance of the Class UI since I'm using a contructor above. 
        const ui = new UI()


        //budget form submit
        budgetForm.addEventListener('submit', function(event) {
          event.preventDefault();
          ui.submitBudgetForm();

        })

        //expense form submit
        expenseForm.addEventListener('submit', function(event) {
          event.preventDefault();
          ui.submitExpenseForm();
         

        })

        // expense click
        expenseList.addEventListener('click', function() {
    
        })

         
    };

    document.addEventListener("DOMContentLoaded", function() {
      eventListeners();
    });

  


