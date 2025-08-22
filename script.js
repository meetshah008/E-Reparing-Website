
    const problemsData = {
      'Washing Machine': ['Not spinning properly', 'Water not draining', 'Strange noises during cycle', 'Door won’t open after wash'],
      'Microwave': ['Not heating food', 'Buttons not working', 'Sparking inside', 'Turntable not spinning'],
      'Fan': ['Not turning on', 'Unusual noise', 'Speed control not working', 'Blades are loose or broken'],
      'TV': ['No picture or sound', 'Screen flickering', 'Remote not responding', 'HDMI ports not working']
    };

    const repairersData = {
      'Downtown': {
        'Washing Machine': [
          { name: 'Aditya Mehta', phone: '9876543210', rating: 4.8, experience: '5 years', charges: '₹300/visit' },
          { name: 'Priya Mehta', phone: '9876501234', rating: 4.6, experience: '3 years', charges: '₹280/visit' }
        ],
        'Microwave': [
          { name: 'Parnaraj Vaidya', phone: '9876001122', rating: 4.5, experience: '4 years', charges: '₹250/visit' }
        ],
        'Fan': [
          { name: 'Smit Patel', phone: '9876200456', rating: 4.7, experience: '6 years', charges: '₹200/visit' }
        ],
        'TV': [
          { name: 'Mansi Patel', phone: '9876345678', rating: 4.9, experience: '7 years', charges: '₹350/visit' }
        ]
      }
    };

    let selectedTech = null;

    function showAddressBox() {
      const city = document.getElementById('citySelect').value;
      const addressInput = document.getElementById('addressInput');
      addressInput.style.display = city ? 'inline-block' : 'none';
    }

    function showProblems(appliance) {
      const area = 'Downtown';
      const list = document.getElementById('problems');
      const title = document.getElementById('applianceTitle');
      const problemBox = document.getElementById('problemList');
      const repairersBox = document.getElementById('repairersList');
      const repairerList = document.getElementById('repairers');

      title.textContent = `Common problems with ${appliance}`;
      list.innerHTML = '';
      repairersBox.style.display = 'none';
      repairerList.innerHTML = '';

      problemsData[appliance].forEach(problem => {
        const li = document.createElement('li');
        li.textContent = problem;
        li.onclick = () => showRepairers(appliance, area);
        list.appendChild(li);
      });

      problemBox.style.display = 'block';
    }

    function showRepairers(appliance, area) {
      const repairersBox = document.getElementById('repairersList');
      const repairerList = document.getElementById('repairers');
      repairerList.innerHTML = '';

      const areaRepairers = repairersData[area]?.[appliance] || [];
      if (areaRepairers.length === 0) {
        repairerList.innerHTML = '<li>No technicians available in this area.</li>';
      } else {
        areaRepairers.forEach(tech => {
          const li = document.createElement('li');
          li.innerHTML = `
          <div class="repairer-card">
            <h5>${tech.name}</h5>
            <p>📞 ${tech.phone}</p>
            <p>⭐ Rating: ${tech.rating}</p>
            <p>🛠️ Experience: ${tech.experience}</p>
            <p>💰 Charges: ${tech.charges}</p>
            <button onclick="openBooking('${tech.name}')">Book Now</button>
          </div>
        `;
          repairerList.appendChild(li);
        });
      }

      repairersBox.style.display = 'block';
    }

    function openBooking(techName) {
      selectedTech = techName;
      document.getElementById('bookingPopup').style.display = 'flex';
      document.getElementById('bookingTech').textContent = "Booking with " + techName;
    }

    function closeBooking() {
      document.getElementById('bookingPopup').style.display = 'none';
    }

    function submitBooking() {
      const name = document.getElementById('custName').value;
      const phone = document.getElementById('custPhone').value;
      const problem = document.getElementById('custProblem').value;
      const time = document.getElementById('custTime').value;

      if (!name || !phone || !problem || !time) {
        alert("⚠️ Please fill all fields!");
        return;
      }

      // Save booking to localStorage
      const bookingData = { technician: selectedTech, name, phone, problem, time, date: new Date().toLocaleString() };
      let allBookings = JSON.parse(localStorage.getItem('allBookings')) || [];
      allBookings.push(bookingData);
      localStorage.setItem('allBookings', JSON.stringify(allBookings));

      alert("✅ Booking Successful!\nTechnician: " + selectedTech);
      closeBooking();
      loadBookings();
    }

   function loadBookings() {
  const container = document.getElementById('myBookings');
  let allBookings = JSON.parse(localStorage.getItem('allBookings')) || [];

  if (allBookings.length === 0) {
    container.innerHTML = "<p>No bookings yet.</p>";
    return;
  }

  container.innerHTML = "";
  allBookings.forEach((b, index) => {
    const div = document.createElement('div');
    div.style.marginBottom = "15px";
    div.style.padding = "10px";
    div.style.border = "1px solid var(--card-bg)";
    div.style.borderRadius = "8px";
    div.innerHTML = `
      <strong>Technician:</strong> ${b.technician} <br>
      <strong>Name:</strong> ${b.name} <br>
      <strong>Phone:</strong> ${b.phone} <br>
      <strong>Problem:</strong> ${b.problem} <br>
      <strong>Preferred Time:</strong> ${b.time} <br>
      <small>📅 Booked on: ${b.date}</small><br>
      <button onclick="cancelBooking(${index})" 
        style="margin-top:8px; background:crimson; color:white; border:none; padding:5px 10px; border-radius:5px; cursor:pointer;">
        Cancel Booking
      </button>
    `;
    container.appendChild(div);
  });
}

function cancelBooking(index) {
  let allBookings = JSON.parse(localStorage.getItem('allBookings')) || [];
  allBookings.splice(index, 1);
  localStorage.setItem('allBookings', JSON.stringify(allBookings));
  loadBookings();
}

function clearAllBookings() {
  if (confirm("⚠️ Are you sure you want to clear all bookings?")) {
    localStorage.removeItem('allBookings');
    loadBookings();
  }
}


    function toggleTheme() {
      document.body.classList.toggle('light-mode');
      const theme = document.body.classList.contains('light-mode') ? 'light' : 'dark';
      localStorage.setItem('theme', theme);
    }

    document.addEventListener('DOMContentLoaded', () => {
      // Apply saved theme
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
      }

      // Set appliance click handlers
      document.querySelectorAll('.appliance').forEach(div => {
        div.addEventListener('click', () => {
          const appliance = div.getAttribute('data-appliance');
          showProblems(appliance);
        });
      });

      loadBookings();
    });



//------------------------------------------------------------------------------------------------------//
let isRegister = false;
let isPasswordVisible = false;

function openAuthModal() {
  document.getElementById('authModal').style.display = 'flex';
  showAuthForm();
  // Add escape key listener
  document.addEventListener('keydown', handleEscapeKey);
}

function closeAuthModal() {
  document.getElementById('authModal').style.display = 'none';
  // Remove escape key listener
  document.removeEventListener('keydown', handleEscapeKey);
}

function handleEscapeKey(event) {
  if (event.key === 'Escape') {
    closeAuthModal();
  }
}

function showAuthForm() {
  const title = document.getElementById('authTitle');
  const subtitle = document.querySelector('.auth-subtitle');
  const usernameGroup = document.getElementById('usernameGroup');
  const switchText = document.getElementById('authSwitch');
  const buttonText = document.querySelector('.button-text');
  
  if (isRegister) {
    title.textContent = "Create Account";
    subtitle.textContent = "Sign up to get started";
    usernameGroup.style.display = 'block';
    switchText.innerHTML = 'Already have an account? <span class="switch-link">Sign in</span>';
    buttonText.textContent = 'Create Account';
  } else {
    title.textContent = "Welcome Back";
    subtitle.textContent = "Sign in to your account to continue";
    usernameGroup.style.display = 'none';
    switchText.innerHTML = "Don't have an account? <span class='switch-link'>Sign up</span>";
    buttonText.textContent = 'Sign In';
  }
}

function togglePassword() {
  const passwordInput = document.getElementById('authPassword');
  const eyeIcon = document.querySelector('.eye-icon');
  
  isPasswordVisible = !isPasswordVisible;
  
  if (isPasswordVisible) {
    passwordInput.type = 'text';
    eyeIcon.innerHTML = `
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <line x1="1" y1="1" x2="23" y2="23" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    `;
  } else {
    passwordInput.type = 'password';
    eyeIcon.innerHTML = `
      <path d="M1 12S5 4 12 4S23 12 23 12S19 20 12 20S1 12 1 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    `;
  }
}

function showLoading(show) {
  const buttonText = document.querySelector('.button-text');
  const buttonLoader = document.querySelector('.button-loader');
  
  if (show) {
    buttonText.style.opacity = '0';
    buttonLoader.style.display = 'block';
  } else {
    buttonText.style.opacity = '1';
    buttonLoader.style.display = 'none';
  }
}

function showNotification(message, type = 'success') {
  // Create notification element
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 15px 20px;
    border-radius: 8px;
    color: white;
    font-weight: 500;
    z-index: 10000;
    transform: translateX(100%);
    transition: transform 0.3s ease;
    ${type === 'success' ? 'background: linear-gradient(135deg, #10b981, #059669);' : 'background: linear-gradient(135deg, #ef4444, #dc2626);'}
  `;
  notification.textContent = message;
  
  document.body.appendChild(notification);
  
  // Animate in
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
  }, 100);
  
  // Remove after 3 seconds
  setTimeout(() => {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 3000);
}

// Handle form submission
document.getElementById('authForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const username = document.getElementById('authUsername').value;
  const email = document.getElementById('authEmail').value;
  const password = document.getElementById('authPassword').value;

  if (isRegister) {
    if (!username || !email || !password) {
      showNotification('Please fill all fields!', 'error');
      return;
    }
    
    showLoading(true);
    
    // Simulate registration (replace with actual API call)
    setTimeout(() => {
      showLoading(false);
      showNotification('✅ Account created successfully!');
      isRegister = false;
      showAuthForm();
      // Clear form
      document.getElementById('authForm').reset();
    }, 2000);
    
  } else {
    if (!email || !password) {
      showNotification('Please fill all fields!', 'error');
      return;
    }
    
    showLoading(true);
    
    // Simulate login (replace with actual API call)
    setTimeout(() => {
      showLoading(false);
      showNotification('✅ Logged in successfully!');
      closeAuthModal();
      // Clear form
      document.getElementById('authForm').reset();
    }, 2000);
  }
});

// Handle switch between login/register
document.getElementById('authSwitch').addEventListener('click', function(e) {
  if (e.target.classList.contains('switch-link')) {
    isRegister = !isRegister;
    showAuthForm();
    // Clear form when switching
    document.getElementById('authForm').reset();
  }
});

// Handle Google sign-in
document.querySelector('.social-button.google').addEventListener('click', function() {
  showNotification('Google sign-in coming soon!', 'error');
});

// Close modal when clicking outside
document.getElementById('authModal').addEventListener('click', function(e) {
  if (e.target === this) {
    closeAuthModal();
  }
});

// ======================================================================================
// ------------------- AUTH FORM -------------------
document.getElementById('authForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const isSignup = document.getElementById('authTitle').textContent === 'Sign Up';
  const name = document.getElementById('authName').value.trim();
  const email = document.getElementById('authEmail').value.trim();
  const password = document.getElementById('authPassword').value.trim();

  let url = isSignup ? "register.php" : "login.php";
  let bodyData = isSignup 
    ? `name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`
    : `email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`;

  showLoading(true);

  fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: bodyData
  })
  .then(res => res.json())
  .then(data => {
    showLoading(false);

    if (data.status === "success") {
      showNotification(data.message);
      closeAuthModal();

      // 👇 login ke baad navbar update karna (Sign In -> Welcome User)
      if (!isSignup) {
        document.querySelector('.nav-buttons').innerHTML = `
          <span style="margin-right: 15px;">👋 Welcome</span>
          <button class="btn" id="logoutBtn">Logout</button>
        `;
        document.getElementById('logoutBtn').addEventListener('click', logoutUser);
      }

    } else {
      showNotification(data.message, "error");
    }
  })
  .catch(err => {
    showLoading(false);
    showNotification("Server error!", "error");
  });
});

function logoutUser() {
  fetch("logout.php") // bana lena chhota sa PHP file jo session_destroy kare
  .then(() => {
    location.reload();
  });
}
//=======================================================================================
// ------------------- BOOKING FORM -------------------
document.getElementById('bookingForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const service = document.getElementById('service').value;
  const date = document.getElementById('date').value;
  const details = document.getElementById('details').value;

  if (!service || !date) {
    showNotification("Please select service and date!", "error");
    return;
  }

  showLoading(true);

  fetch("booking.php", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `service=${encodeURIComponent(service)}&booking_date=${encodeURIComponent(date)}&details=${encodeURIComponent(details)}`
  })
  .then(res => res.json())
  .then(data => {
    showLoading(false);
    showNotification(data.message, data.status === "success" ? "" : "error");
    if (data.status === "success") {
      document.getElementById('bookingForm').reset();
    }
  })
  .catch(() => {
    showLoading(false);
    showNotification("Server error!", "error");
  });
});
//===================================================================================


