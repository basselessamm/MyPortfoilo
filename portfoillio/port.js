document.addEventListener('DOMContentLoaded', function () {
    // Scroll animation observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));

    // Mobile menu toggle
    document.getElementById('menu-toggle').addEventListener('click', function () {
        document.getElementById('mobile-menu').classList.toggle('hidden');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('#mobile-menu a').forEach(link => {
        link.addEventListener('click', function () {
            document.getElementById('mobile-menu').classList.add('hidden');
        });
    });

    // Back to Top Button
    const backToTopButton = document.getElementById('back-to-top');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Populate skills with dynamic Font Awesome icons
    const skills = [
        { name: 'JavaScript/TypeScript', level: 90, icon: 'fab fa-js' },
        { name: 'React.js', level: 90, icon: 'fab fa-react' },
        { name: 'Node.js/Express', level: 88, icon: 'fab fa-node-js' },
        { name: 'PHP/Laravel', level: 93, icon: 'fab fa-php' },
        { name: 'UI/UX Design', level: 82, icon: 'fab fa-figma' },
        { name: 'MySQL', level: 89, icon: 'fas fa-database' }
    ];

    const skillsGrid = document.querySelector('.skills-grid');
    skills.forEach((skill, index) => {
        const skillElement = document.createElement('div');
        skillElement.className = 'glass-card skill-card p-6 rounded-2xl';
        skillElement.innerHTML = `
            <i class="${skill.icon} skill-icon text-4xl text-accent"></i>
            <span class="text-lg font-medium font-['Space_Mono'] mb-2">${skill.name}</span>
            <span class="text-accent mb-2">${skill.level}%</span>
            <div class="skill-bar">
                <div class="skill-progress" style="width: ${skill.level}%"></div>
            </div>
        `;
        skillsGrid.appendChild(skillElement);
    });

    // Populate projects
    const projects = [
        {
            id: 1,
            title: 'E-commerce Book Store',
            description: 'A modern web-based bookstore with seamless payment integration, dynamic inventory management, and a user-friendly interface for browsing and purchasing books.',
            tags: ['html', 'css', 'JS'],
            image: '/img/books.jpg',
            live: '#',
            github: '#'
        },
        {
            id: 2,
            title: 'System-Gym',
            description: 'A comprehensive gym management system featuring member registration, workout scheduling, trainer management, and real-time analytics for gym operations.',
            tags: ['PHP Native', 'JS' , 'CSS', 'Bootstrap', 'MySQL'],
            image: 'img/gym.png',
            live: '#',
            github: '#'
        },
        {
            id: 3,
            title: 'Login & Register System',
            description: 'A secure authentication system with full features including OTP verification, password reset, user registration, and login with robust security measures.',
            tags: ['PHP Native', 'CSS', 'Bootstrap', 'MySQL'],
            image: 'img/login.png',
            live: '#',
            github: '#'
        }
    ];

    const projectsGrid = document.querySelector('.projects-grid');
    projects.forEach((project, index) => {
        const projectElement = document.createElement('div');
        projectElement.className = 'glass-card project-card p-6 rounded-2xl';
        projectElement.innerHTML = `
        <div class="relative h-48 overflow-hidden rounded-lg mb-4">
            <img src="${project.image}" alt="${project.title}" class="w-full h-full object-cover">
            <div class="project-overlay">
                <a href="${project.live}" class="px-4 py-2 bg-gradient-to-r from-primary to-secondary rounded-lg text-text font-medium mb-2">Live Demo</a>
                <a href="${project.github}" class="px-4 py-2 glass-card rounded-lg text-text font-medium">GitHub</a>
            </div>
        </div>
        <h3 class="text-xl font-bold mb-2 font-['Space_Mono']">${project.title}</h3>
        <p class="text-text-muted mb-4">${project.description}</p>
        <div class="flex flex-wrap gap-2 mb-4">
            ${project.tags.map(tag => `<span class="px-3 py-1 bg-primary/20 rounded-full text-sm text-accent">${tag}</span>`).join('')}
        </div>
    `;
        projectsGrid.appendChild(projectElement);
    });

    // Populate experience
    const experiences = [
        {
            type: 'experience',
            title: 'Senior Web Developer',
            organization: 'TechInnovate Solutions',
            period: '2023 - Present',
            description: 'Orchestrated a team to deliver enterprise-grade web applications for global clients.'
        },
        {
            type: 'experience',
            title: 'Full Stack Developer',
            organization: 'DigitalCraft Studios',
            period: '2020 - 2023',
            description: 'Crafted robust web applications using PHP , Laravel and MySQL.'
        },
        {
            type: 'education',
            title: 'Full Stack PHP',
            organization: 'ITI',
            period: '2024',
            description: 'Mastered Software Engineering and Human-Computer Interaction.'
        },
        {
            type: 'education',
            title: 'BIS in Information Technology',
            organization: 'MET',
            period: '2020 - 2024',
            description: 'Graduated with honors, leading the Web Development Club.'
        }
    ];

    const experienceContainer = document.getElementById('experience-container');
    experiences.forEach((exp, index) => {
        const expElement = document.createElement('div');
        expElement.className = 'timeline-item';
        expElement.innerHTML = `
            <h3 class="text-xl font-bold font-['Space_Mono']">${exp.title}</h3>
            <p class="text-accent mb-2">${exp.organization} • ${exp.period}</p>
            <p class="text-text-muted">${exp.description}</p>
        `;
        experienceContainer.appendChild(expElement);
    });

    // Populate testimonials
    // const testimonials = [
    //     {
    //         name: 'Jane Smith',
    //         role: 'CEO at TechStart',
    //         content: 'A visionary who delivers beyond expectations with unparalleled precision.',
    //         avatar: '/assets/avatars/avatar-1.png'
    //     },
    //     {
    //         name: 'Michael Johnson',
    //         role: 'Product Manager at InnovateCo',
    //         content: 'Transformed our vision into reality with exceptional skill and creativity.',
    //         avatar: '/assets/avatars/avatar-2.png'
    //     }
    // ];

    const testimonialsContainer = document.getElementById('testimonials-container');
    testimonials.forEach((testimonial, index) => {
        const testimonialElement = document.createElement('div');
        testimonialElement.className = 'glass-card p-6 rounded-2xl';
        testimonialElement.innerHTML = `
            <div class="flex items-center mb-4">
                <div class="w-12 h-12 rounded-full overflow-hidden mr-4 relative">
                    <div class="image-placeholder w-full h-full">
                        <i class="fas fa-user"></i>
                    </div>
                </div>
                <div>
                    <h4 class="font-bold font-['Space_Mono']">${testimonial.name}</h4>
                    <p class="text-sm text-accent">${testimonial.role}</p>
                </div>
            </div>
            <p class="text-text-muted">"${testimonial.content}"</p>
        `;
        testimonialsContainer.appendChild(testimonialElement);
    });

    // Form validation
    const contactForm = document.querySelector('form');
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        if (name && email && message) {
            alert('Thank you for your message! I’ll respond soon.');
            contactForm.reset();
        }
    });

    // Animate skill bars on scroll
    const skillBars = document.querySelectorAll('.skill-progress');
    const animateSkillBars = () => {
        skillBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0';
            setTimeout(() => {
                bar.style.width = width;
            }, 300);
        });
    };

    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkillBars();
                skillsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    skillsObserver.observe(document.getElementById('skills'));
});
