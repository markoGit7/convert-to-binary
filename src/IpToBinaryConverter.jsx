import React, { useState } from 'react';

//Font Awesome ICONS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faCheckSquare } from '@fortawesome/free-solid-svg-icons';

// Add icons to the library
import { library } from '@fortawesome/fontawesome-svg-core';
library.add(faCoffee, faCheckSquare);



function IpToBinaryConverter() {
    const [n, setN] = useState('');//document.querySelector('input').value
    const [result, setResult] = useState('');

    
    
    function configFocus(isFocus) {//Function for events that will happen when the input is focused
        const input = document.querySelector('input'), btn = document.querySelector('#submit');
    
        if(isFocus) {
            
            input.classList.add('focus');
            btn.classList.add('focus');
    
        } else {
            
            if(input.classList.contains('focus') && btn.classList.contains('focus')) {
                input.classList.remove('focus');
                btn.classList.remove('focus');
            } else {
                return;
            }
        }
    }
    
    
    window.onload = function() {
        const input = document.querySelector('input'), btn = document.querySelector('#submit'), body = document.querySelector('body');    
        
        input.focus();
        
        configFocus(true);
    };



    const inputJoin = (input) => {//Function for removing the extra space before the dot ex: "". > .
        input.value += '.';
        let j = input.value.replace(/\s*\.\s*/g, '.');
        return j;
    };



    function dotInsert() {//Function for inserting dots when "Space Bar" has been clicked
        let input = document.querySelector('input');

        input.addEventListener('input', function(event) {
            let value = event.target.value;
            let lastEntered = value.slice(-1);

            if (value === ' ') {//If input has no value, Space Bar has been clicked, don't do anything
                event.target.value = value.replace(' ', '');
                return;
            }
            
            if(lastEntered === ' ') {//If the current entered input value is ' ' do the following instructions
                let beforelastEntered = value[value.length - 2];

                if(beforelastEntered === '.') {// Multiple dots in a row blocker
                    event.target.value = value.replace(' ', '');
                    return;
                }

                
                if(input.value.includes('.')) {// Limitation
                    let allSeparators = (input.value.split('.')).length;
                    
                    if(allSeparators === 4) {
                        event.target.value = value.replace(' ', '');
                        return;
                    }
                }
                
                let joined = inputJoin(input);
                
                input.value = joined;
                
                
            }
            


        });
    };



    function press(e) {//Function for event handeling on key press
        let input = document.querySelector('input');
        let value = e.target.value;
        
        if(e.key === 'Enter' && value !== '') {
            
            solve();
            input.blur();

            configFocus(false);

        }

        dotInsert();

    };


    

    if(result !== '') {
        update();
        setResult('');
    }

    const error = (e) => {
      return e !== '' ? e : '';
    };
  
    const isExisting = (octet) => {//Function for checking if the current octate exist in 2^n
      let s = null;
  
      for (let j = 7; j > -1; j--) {
        s = j;
        s = Math.pow(2, s);
  
        if (octet === s) {
          return true;
        } else {
          if (j === 0) {
            return false;
          }
        }
      }
    };
  
    const solve = () => {//Main Function for solving the binary alghoritam 
        let msg = ``,
            err;
        let cut = n.split('.');
        
        let res = '';
  
        if (cut.length < 4) {
            msg = `You need 4 octets, but you have ${cut.length}`;
            err = error(msg);
            alert(err);
            setResult('');
            return;
        }
  
        for (let i = 0; i < cut.length; i++) {
            let octet = Number(cut[i]);
            
            let exist = isExisting(octet);
            let s = null,
            target = 0;
    
            if (octet > 255) {
            msg = `One octet can only get, up to 255. You're octet ${i+1} contains ${octet}. Adjust it to work`;
            err = error(msg);
            alert(err);
            setResult('');
            return;
            }
    
            for (let j = 7; j > -1; j--) {
                s = j;
                s = Math.pow(2, s);
                

                if (exist) {
                    octet === s ? (res += '1') : (res += '0');
                    continue;
                }
    
                if (octet > s) {
                    target += s;           
        
                    if (target <= octet) {
                        res += '1';
                    } else {
                        target = target - s;
                        res += '0';
                    }

                } else {
                    res += '0';
                }
                
    
            }

            if (i < cut.length - 1) {
                res += '.';
            }
    
        }

        setResult(res);
    };

    function update() {//Function for displaying the output on the input field
        let output = document.querySelector('input');
        output.value = '';
        output.value = result;
    };

  
    return (
        <>
            <section className='form-block'>
                <h1>192 <span><i class="fa-solid fa-rotate"></i></span> 11000000</h1>
                <div className='internal'>
                    <input
                    type="text"
                    onFocus={() => configFocus(true)} 
                    onBlur={() => configFocus(false)}
                    onKeyDown={(e) => press(e)} 
                    onChange={(e) => setN(e.target.value)}
                    placeholder='Enter IP Address (e.g., 192.168.1.1)'
                    />
                    <button id='submit' onClick={solve}><FontAwesomeIcon icon="fa-solid fa-square-check" /></button>
                </div>

                <div className='features'>
                    <h2>Features:</h2>
                    <ul>
                        <li>By clicking <b>SPACE</b> you add <b>.</b></li>
                        <li>By clicking <b>ENTER</b> you get resul</li>
                    </ul>
                </div>
            </section>

            <div className='version'>
                Version: 1.0.0
            </div>
        </>
        
    );
}
export default IpToBinaryConverter;