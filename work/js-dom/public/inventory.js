"use strict";
(function iife() {

  const inventories = [
    {
        name: 'Cookies',
        quantity: 0,
    },
    {
        name: 'Milk',
        quantity: 8,
    },
  ];

  const listEl = document.querySelector('#inventory-app .inventories');
  const inputEl = document.querySelector('#inventory-app input');
  const buttonEl = document.querySelector('#inventory-app button');

  disableButtonIfNoInput();
  addAbilityToAddItems();
  addAbilityToDeleteItems();
  addAbilityToIncreaseInventory();
  addAbilityToDecreaseInventory();

  render(inventories); 

  function render( inventories ) {
    const html = inventories.map( (inventory, index) => {
      return `
        <li class="inventory ${inventory.quantity === 0 ? "out-of-stock" : ""}"">
            <div class="inventory-container">
                <span class="inventory-name data-index="${index}">${inventory.name}</span>
                <div class="inventory-quantity">
                    <button class="decrease" data-index="${index}" ${inventory.quantity === 0 ? "disabled" : ""}>-</button>
                    <span class="quantity-value" data-index="${index}">${inventory.quantity}</span>
                    <button class="increase" data-index="${index}">+</button>
                </div>
                <button class="delete" data-index="${index}">X Delete</button>
            </div>
        </li>
      `;

    }).join('');

    listEl.innerHTML = html;

    buttonEl.disabled = !inputEl.value;
  };



  function disableButtonIfNoInput() {
    inputEl.addEventListener('input', () => {
      buttonEl.disabled = !inputEl.value;
    });
  }

  function addAbilityToIncreaseInventory() {

    listEl.addEventListener('click', (e) => {
      if(!e.target.classList.contains('increase')) {
        return;
      }

      const index = e.target.dataset.index; 
      inventories[index].quantity += 1;
      render(inventories);
    });
  }

  function addAbilityToDecreaseInventory() {

    listEl.addEventListener('click', (e) => {
      if(!e.target.classList.contains('decrease')) {
        return;
      }

      const index = e.target.dataset.index; 
      inventories[index].quantity -= 1;
      render(inventories);
    });
  }

  function addAbilityToAddItems() {
    buttonEl.addEventListener('click', (e) => {
      const newInventory = {
        name: inputEl.value,
        quantity: 0,
      };
      inventories.push(newInventory);
      inputEl.value = '';
      render(inventories);
    });
  }

  function addAbilityToDeleteItems() {
    listEl.addEventListener('click', (e) => {
      if(!e.target.classList.contains('delete')) {
        return;
      }

      const index = e.target.dataset.index;
      inventories.splice(index, 1); 
      render(inventories);
    });
  }

})();


