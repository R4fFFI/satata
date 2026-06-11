// app.js - SPA core, dummy data, routing, bookmarks
(function(){
    const COMPANY_COUNT = 20;
    const USER_COUNT = 100;
    const JOB_COUNT = 60; // generate 60 to exceed 50

    function uid(prefix='id'){
        return prefix+Math.random().toString(36).slice(2,9);
    }

    function seedStorage(){
        if(!localStorage.getItem('satata_companies')){
            const companies = generateCompanies(COMPANY_COUNT);
            localStorage.setItem('satata_companies', JSON.stringify(companies));
        }
        if(!localStorage.getItem('satata_users')){
            const users = generateUsers(USER_COUNT);
            localStorage.setItem('satata_users', JSON.stringify(users));
        }
        if(!localStorage.getItem('satata_jobs')){
            const jobs = generateJobs(JOB_COUNT);
            localStorage.setItem('satata_jobs', JSON.stringify(jobs));
        }
        if(!localStorage.getItem('satata_saved')){
            localStorage.setItem('satata_saved', JSON.stringify([]));
        }
        if(!localStorage.getItem('satata_accounts')){
            const defaultAccounts = {};
            // create an admin account for convenience
            const adminId = uid('u');
            defaultAccounts['admin@example.com'] = { id: adminId, name: 'Administrator', email: 'admin@example.com', password: 'admin', role: 'admin' };
            localStorage.setItem('satata_accounts', JSON.stringify(defaultAccounts));
            // create admin profile
            const profiles = JSON.parse(localStorage.getItem('satata_profiles')||'{}');
            profiles[adminId] = { name: 'Administrator', role: 'admin', email: 'admin@example.com', phone:'', location:'', address:'', city:'', education:'', disability:'', workExperience: [], skills: [] };
            localStorage.setItem('satata_profiles', JSON.stringify(profiles));
        }
        if(!localStorage.getItem('satata_profiles')){
            localStorage.setItem('satata_profiles', JSON.stringify({}));
        }
        if(!localStorage.getItem('satata_messages')){
            localStorage.setItem('satata_messages', JSON.stringify([]));
        }
    }

    function pick(arr){ return arr[Math.floor(Math.random()*arr.length)]; }

    function generateCompanies(n){
        const names = ['IndoTech','Satria Solusi','Nusantara Labs','Gojek','Tokopedia','Unilever Indonesia','Bank Mandiri','Telkom Indonesia','Bukalapak','Ruangguru','Kredivo','XL Axiata','Pertamina','Garuda Indonesia','Traveloka','Shopee Indonesia','DANA','OVO','Blibli','Kementerian Kesehatan'];
        const companies = [];
        for(let i=0;i<n;i++){
            companies.push({
                id: uid('co'),
                name: names[i % names.length] + (i>=names.length? ' '+(i+1):''),
                location: pick(['Jakarta','Bandung','Surabaya','Yogyakarta','Medan','Denpasar','Makassar']),
                size: pick(['1-50','51-200','201-1000','1000+'])
            });
        }
        return companies;
    }

    function generateUsers(n){
        const first = ['Agus','Budi','Citra','Dewi','Eka','Fajar','Gita','Hadi','Indra','Joko','Kiki','Lina','Mega','Nina','Oka','Putri','Rina','Sari','Tono','Vina'];
        const users = [];
        for(let i=0;i<n;i++){
            users.push({
                id: uid('u'),
                name: pick(first)+' '+pick(['Saputra','Wijaya','Rizky','Aulia','Pratama','Setiawan','Haryanto','Prabowo']),
                email: `user${i+1}@example.com`,
                phone: `+62 81${Math.floor(10000000+Math.random()*89999999)}`,
                city: pick(['Jakarta','Bandung','Surabaya','Yogyakarta','Medan']),
                education: pick(['SMA','Diploma','S1','S2']),
                disability: pick(['Daksa','Netra','Rungu','Wicara','Intelektual Ringan','Mental Psikososial','Autisme','Down Syndrome','Cerebral Palsy','Multiple Disabilities'])
            });
        }
        return users;
    }

    function generateJobs(n){
        const categories = ['IT','Frontend','Backend','Fullstack','UI UX','QA','DevOps','Data Analyst','Data Scientist','Cyber Security','AI Engineer','Administrasi','Customer Service','Marketing','Digital Marketing','SEO','Content Creator','Finance','Accounting','HRD','Legal','Design','Video Editor','Animator','Remote','Hybrid','Onsite'];
        const disabilities = ['Daksa','Netra','Rungu','Wicara','Intelektual Ringan','Mental Psikososial','Autisme','Down Syndrome','Cerebral Palsy','Multiple Disabilities'];
        const accommodationsList = ['wheelchair','screen_reader','remote','adjustable_workstation','sign_language','assistive_tech','flexible_hours','accessible_parking'];
        const titles = ['Frontend Engineer','Backend Engineer','Fullstack Developer','UI/UX Designer','QA Engineer','DevOps Engineer','Data Analyst','Data Scientist','Cybersecurity Analyst','AI Engineer','Digital Marketer','Content Creator','Financial Analyst','Accountant','HR Specialist','Legal Officer','Graphic Designer','Video Editor','Animator','Customer Service Representative'];
        const benefits = ['Asuransi Kesehatan','Fleksibel Jam Kerja','Kerja Remote','Bonus Tahunan','Fasilitas Kantor Aksesibel'];
        const locations = ['Jakarta','Bandung','Surabaya','Yogyakarta','Medan','Denpasar'];

        const companies = JSON.parse(localStorage.getItem('satata_companies')||'[]');
        const jobs = [];
        for(let i=0;i<n;i++){
            const company = companies[i % companies.length] || {name: 'Perusahaan '+(i+1)};
            const title = pick(titles) + (Math.random()>0.7? ' Senior':'');
            const id = i+1;
            const job = {
                id: id,
                title: title,
                company: company.name,
                companyId: company.id,
                location: pick(locations) + (Math.random()>0.5? ' (Remote)':''),
                salary: pick(['Rp 3 - 5 Juta / Bulan','Rp 5 - 8 Juta / Bulan','Rp 8 - 12 Juta / Bulan','Rp 12 - 20 Juta / Bulan','Dirahasiakan']),
                description: `Deskripsi lengkap untuk posisi ${title} di ${company.name}. Tanggung jawab utama mencakup ...`,
                benefit: [pick(benefits), pick(benefits)],
                categories: [pick(categories)],
                acceptDisability: [pick(disabilities), pick(disabilities)],
                accommodations: Array.from(new Set([pick(accommodationsList), pick(accommodationsList)]) ),
                requirements: ['Min pengalaman 1 tahun','Menguasai tools relevan','Komunikasi baik'],
                aiMatch: Math.floor(60 + Math.random()*40)
            };
            jobs.push(job);
        }
        return jobs;
    }

    function getJobs(){
        return JSON.parse(localStorage.getItem('satata_jobs')||'[]');
    }

    function getCompanies(){
        return JSON.parse(localStorage.getItem('satata_companies')||'[]');
    }
    function saveCompanies(list){
        localStorage.setItem('satata_companies', JSON.stringify(list));
    }

    function getSaved(){
        return JSON.parse(localStorage.getItem('satata_saved')||'[]');
    }

    function toggleSave(jobId){
        const saved = getSaved();
        const idx = saved.indexOf(jobId);
        if(idx===-1){ saved.push(jobId); }
        else { saved.splice(idx,1); }
        localStorage.setItem('satata_saved', JSON.stringify(saved));
        renderSavedCount();
        renderSavedJobs();
    }

    function renderSavedCount(){
        const saved = getSaved();
        // update nav badge if exists
        const savedNav = document.querySelectorAll('.nav-btn');
        // optional: set badge on third button
    }

    function renderJobList(filter=''){
        const container = document.getElementById('jobList');
        if(!container) return;
        let jobs = getJobs();
        const uid = getCurrentUserId();
        const profiles = JSON.parse(localStorage.getItem('satata_profiles')||'{}');
        const profile = uid ? profiles[uid] : null;

        // compute dynamic match score if profile exists
        if(profile){
            jobs = jobs.map(job=> {
                job._computedScore = computeMatchScore(job, profile);
                return job;
            }).sort((a,b)=> b._computedScore - a._computedScore);
        } else {
            jobs = jobs.sort((a,b)=> b.aiMatch - a.aiMatch);
        }

        container.innerHTML = '';
        jobs.forEach(job => {
            const card = document.createElement('article');
            card.className = 'job-card bg-white rounded-xl border border-gray-200 p-5 hover:border-primary hover:shadow-md transition-all cursor-pointer group';
            card.dataset.id = job.id;
            card.dataset.title = job.title.toLowerCase();
            card.dataset.accept = (job.acceptDisability||[]).join(',').toLowerCase();
            card.dataset.accommodations = (job.accommodations||[]).join(',').toLowerCase();
            card.dataset.category = job.categories[0];
            card.innerHTML = `
                <div class="flex justify-between items-start">
                    <div class="flex gap-4">
                        <div class="w-14 h-14 bg-blue-50 rounded-lg flex items-center justify-center text-primary border border-blue-100 flex-shrink-0">
                            <span class="material-symbols-outlined text-3xl">work</span>
                        </div>
                        <div>
                            <h3 class="text-lg font-bold text-slate900 group-hover:text-primary transition-colors mb-1">${job.title}</h3>
                            <p class="text-sm font-medium text-slate-600 mb-2">${job.company}</p>
                            <div class="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                                <span class="flex items-center gap-1"><span class="material-symbols-outlined text-[16px]">location_on</span> ${job.location}</span>
                                <span class="flex items-center gap-1"><span class="material-symbols-outlined text-[16px]">payments</span> ${job.salary}</span>
                            </div>
                        </div>
                    </div>
                    <button class="bookmark-btn text-gray-300 hover:text-red-500 transition-colors" data-id="${job.id}"><span class="material-symbols-outlined">bookmark_border</span></button>
                </div>
                <div class="mt-5 pt-4 border-t border-gray-100 flex justify-between items-center flex-wrap gap-2">
                    <div class="flex gap-2">
                        ${job.acceptDisability.slice(0,2).map(d=>`<span class="px-2.5 py-1 bg-slate-100 text-slate-600 text-[11px] font-semibold rounded uppercase tracking-wide">${d}</span>`).join('')}
                        ${ (job.accommodations||[]).slice(0,2).map(a=>`<span class="px-2.5 py-1 bg-slate-50 text-slate-500 text-[11px] font-medium rounded">${a.replace(/_/g,' ')}</span>`).join('') }
                    </div>
                    <div class="flex items-center gap-1 text-emerald-600 font-bold text-xs bg-emerald-50 px-2.5 py-1 rounded">
                        <span class="material-symbols-outlined text-[14px]">auto_awesome</span> AI Match ${job._computedScore?job._computedScore:job.aiMatch}%
                    </div>
                </div>
            `;

            // click to open detail
            card.addEventListener('click', (e)=>{
                // prevent when bookmark clicked
                if(e.target.closest('.bookmark-btn')) return;
                location.hash = '#/job/'+job.id;
            });

            // accessibility: make card focusable and keyboard-activatable
            card.setAttribute('role','button');
            card.tabIndex = 0;
            card.addEventListener('keydown', (e)=>{
                if(e.key === 'Enter' || e.key === ' '){
                    e.preventDefault();
                    location.hash = '#/job/'+job.id;
                }
            });

            // bookmark handler
            const bmBtn = card.querySelector('.bookmark-btn');
            bmBtn.addEventListener('click', (ev)=>{
                ev.stopPropagation();
                const id = Number(bmBtn.dataset.id);
                toggleSave(id);
                const icon = bmBtn.querySelector('.material-symbols-outlined');
                const saved = getSaved();
                if(saved.indexOf(id)!==-1){ icon.textContent='bookmark'; bmBtn.classList.add('text-red-500'); }
                else { icon.textContent='bookmark_border'; bmBtn.classList.remove('text-red-500'); }
            });

            container.appendChild(card);
        });
    }

    function computeMatchScore(job, profile){
        let score = job.aiMatch || 60;
        const title = (job.title||'').toLowerCase();
        // skill match
        if(profile.skills && profile.skills.length){
            profile.skills.forEach(s => {
                if(!s) return;
                const sk = s.toLowerCase();
                if(title.includes(sk) || job.categories.join(' ').toLowerCase().includes(sk)) score += 12;
            });
        }
        // education (simple bonus for higher education)
        if(profile.education && /s1|s2|s3|s4|bachelor|master|sma/i.test(profile.education)) score += 5;
        // experience length
        if(profile.workExperience) score += Math.min(10, profile.workExperience.length * 2);
        // disability compatibility
        if(profile.disability){
            const pd = profile.disability.toLowerCase();
            const accepts = (job.acceptDisability||[]).map(d=>d.toLowerCase());
            if(accepts.includes(pd)) score += 10;
            else score -= 5;
        }
        score = Math.max(0, Math.min(100, Math.round(score)));
        return score;
    }

    // Saved jobs rendering
    function renderSavedJobs(){
        const container = document.getElementById('savedJobsList');
        if(!container) return;
        const saved = getSaved();
        const jobs = getJobs().filter(j=> saved.indexOf(j.id)!==-1);
        if(jobs.length===0){
            container.innerHTML = `<span class="material-symbols-outlined text-6xl text-gray-300 block mb-4">bookmark</span><p class="text-slate-500">Belum ada lowongan yang tersimpan</p>`;
            return;
        }
        container.innerHTML = jobs.map(j=>`<div class="border-b py-3"><h4 class="font-bold">${j.title}</h4><p class="text-sm text-slate-600">${j.company} • ${j.location}</p></div>`).join('');
    }

    // Company CRUD
    function createCompanyJob(){
        const title = document.getElementById('postTitle').value.trim();
        const company = document.getElementById('postCompany').value.trim();
        const location = document.getElementById('postLocation').value.trim();
        const salary = document.getElementById('postSalary').value.trim();
        const desc = document.getElementById('postDesc').value.trim();
        if(!title || !company) { alert('Judul dan Perusahaan diperlukan'); return; }
        // only company users or admin can create jobs with company ownership
        const uid = getCurrentUserId();
        const accounts = JSON.parse(localStorage.getItem('satata_accounts')||'{}');
        const acc = uid? Object.values(accounts).find(a=>a.id===uid): null;
        if(acc && acc.role !== 'company' && acc.role !== 'admin'){
            if(!confirm('Anda bukan akun perusahaan. Lowongan akan dibuat tanpa kepemilikan perusahaan. Lanjutkan?')) return;
        }
        const jobs = getJobs();
        const id = jobs.length? jobs[jobs.length-1].id + 1 : 1;
        // determine owning companyId from current user if available
        const accounts = JSON.parse(localStorage.getItem('satata_accounts')||'{}');
        const currentUserId = getCurrentUserId();
        let owningCompanyId = null;
        if(currentUserId){
            const acc = Object.values(accounts).find(a=>a.id===currentUserId);
            if(acc && acc.companyId) owningCompanyId = acc.companyId;
        }
        const newJob = { id, title, company, companyId: owningCompanyId, location, salary: salary||'Dirahasiakan', description: desc||'', benefit: [], categories: [], acceptDisability: [], accommodations: [], requirements: [], aiMatch: Math.floor(60+Math.random()*40) };
        jobs.push(newJob);
        localStorage.setItem('satata_jobs', JSON.stringify(jobs));
        alert('Lowongan diposting');
        renderJobList(); renderCompanyJobs();
    }

    function renderCompanyJobs(){
        const container = document.getElementById('companyJobsList');
        if(!container) return;
        const jobs = getJobs();
        const uid = getCurrentUserId();
        const accounts = JSON.parse(localStorage.getItem('satata_accounts')||'{}');
        const currentAcc = uid? Object.values(accounts).find(a=>a.id===uid): null;
        // if current user is company, show only their jobs
        let visibleJobs = jobs;
        if(currentAcc && currentAcc.role === 'company' && currentAcc.companyId){
            visibleJobs = jobs.filter(j=>j.companyId === currentAcc.companyId);
        }
        if(visibleJobs.length===0){ container.innerHTML = '<p class="text-sm text-slate-500">Belum ada lowongan.</p>'; return; }
        // if current user is not company or admin, show message to login as company to manage
        if(!currentAcc || (currentAcc.role !== 'company' && currentAcc.role !== 'admin')){
            container.innerHTML = `<p class="text-sm text-slate-500">Untuk mengelola lowongan, silakan login sebagai akun Perusahaan.</p>` + visibleJobs.map(j=>`<div class="border p-3 rounded flex justify-between items-center"><div><h4 class="font-bold">${j.title}</h4><p class="text-sm text-slate-600">${j.company} • ${j.location}</p></div><div class="flex gap-2"><button onclick="renderJobApplicants(${j.id})" class="px-2 py-1 bg-slate-100 rounded">Pelamar</button></div></div>`).join('');
            return;
        }

        container.innerHTML = visibleJobs.map(j=>`<div class="border p-3 rounded flex justify-between items-center"><div><h4 class="font-bold">${j.title}</h4><p class="text-sm text-slate-600">${j.company} • ${j.location}</p></div><div class="flex gap-2"><button onclick="renderJobApplicants(${j.id})" class="px-2 py-1 bg-slate-100 rounded">Pelamar</button><button onclick="editJob(${j.id})" class="px-2 py-1 bg-slate-100 rounded">Edit</button><button onclick="deleteJob(${j.id})" class="px-2 py-1 bg-red-100 text-red-600 rounded">Hapus</button></div></div>`).join('');
    }

    function deleteJob(id){
        // permission check: only admin or owning company can delete
        const uid = getCurrentUserId();
        const accounts = JSON.parse(localStorage.getItem('satata_accounts')||'{}');
        const acc = uid? Object.values(accounts).find(a=>a.id===uid): null;
        const jobs = getJobs();
        const job = jobs.find(j=>j.id===id);
        if(!job) return alert('Lowongan tidak ditemukan');
        const canDelete = (acc && acc.role === 'admin') || (acc && acc.role === 'company' && acc.companyId && job.companyId === acc.companyId);
        if(!canDelete) return alert('Anda tidak memiliki izin untuk menghapus lowongan ini.');
        if(!confirm('Hapus lowongan ini?')) return;
        const remaining = jobs.filter(j=>j.id!==id);
        localStorage.setItem('satata_jobs', JSON.stringify(remaining));
        renderJobList(); renderCompanyJobs();
    }

    function editJob(id){
        const jobs = getJobs();
        const job = jobs.find(j=>j.id===id);
        if(!job) return alert('Lowongan tidak ditemukan');
        // permission check: only admin or owning company can edit
        const uid = getCurrentUserId();
        const accounts = JSON.parse(localStorage.getItem('satata_accounts')||'{}');
        const acc = uid? Object.values(accounts).find(a=>a.id===uid): null;
        const canEdit = (acc && acc.role === 'admin') || (acc && acc.role === 'company' && acc.companyId && job.companyId === acc.companyId);
        if(!canEdit) return alert('Anda tidak memiliki izin untuk mengedit lowongan ini.');
        // Simple edit via prompt for title and desc (for speed)
        const newTitle = prompt('Edit Judul', job.title);
        if(newTitle!==null) job.title = newTitle;
        const newDesc = prompt('Edit Deskripsi', job.description);
        if(newDesc!==null) job.description = newDesc;
        localStorage.setItem('satata_jobs', JSON.stringify(jobs));
        renderJobList(); renderCompanyJobs();
    }

    // Company: render applicants for a job with filtering & pagination
    let companyApplicantsPage = 1;
    const companyApplicantsPageSize = 5;
    let currentApplicantsJobId = null;
    let applicantsFilterQuery = '';
    let applicantsFilterStatus = 'all';

    function renderJobApplicants(jobId, page=1){
        // Ownership check: if current user is company, ensure they own this job
        const uid = getCurrentUserId();
        if(uid){
            const accounts = JSON.parse(localStorage.getItem('satata_accounts')||'{}');
            const acc = Object.values(accounts).find(a=>a.id===uid);
            if(acc && acc.role === 'company'){
                const jobs = getJobs();
                const job = jobs.find(j=>Number(j.id)===Number(jobId));
                if(job && job.companyId && acc.companyId !== job.companyId){
                    return alert('Anda tidak memiliki izin untuk melihat pelamar pada lowongan ini.');
                }
            }
        }
        currentApplicantsJobId = jobId;
        companyApplicantsPage = page || 1;
        const allApps = getApplications().filter(a=>Number(a.jobId)===Number(jobId));
        const profiles = getProfiles();
        const jobs = getJobs();
        const job = jobs.find(j=>Number(j.id)===Number(jobId)) || { title: 'Lowongan' };
        const container = document.getElementById('companyApplicantsList');
        if(!container){ alert('Kontainer pelamar tidak ditemukan'); return; }

        // show applicants section and hide jobs list
        const sec = document.getElementById('companyApplicantsSection');
        if(sec) sec.classList.remove('hidden');
        const jobsList = document.getElementById('companyJobsList');
        if(jobsList) jobsList.classList.add('hidden');

        // read filters
        const qInput = document.getElementById('applicantSearch');
        const statusSel = document.getElementById('applicantStatusFilter');
        applicantsFilterQuery = qInput? qInput.value.trim().toLowerCase() : applicantsFilterQuery;
        applicantsFilterStatus = statusSel? statusSel.value : applicantsFilterStatus;

        let apps = allApps.slice();
        if(applicantsFilterStatus && applicantsFilterStatus !== 'all'){
            apps = apps.filter(a=> (a.status||'Submitted') === applicantsFilterStatus);
        }
        if(applicantsFilterQuery){
            apps = apps.filter(a=>{
                const p = profiles[a.userId] || {};
                const hay = ((p.name||'') + ' ' + (p.email||'')).toLowerCase();
                return hay.includes(applicantsFilterQuery);
            });
        }

        const total = apps.length;
        const pages = Math.max(1, Math.ceil(total / companyApplicantsPageSize));
        if(companyApplicantsPage > pages) companyApplicantsPage = pages;
        const start = (companyApplicantsPage - 1) * companyApplicantsPageSize;
        const pageItems = apps.slice(start, start + companyApplicantsPageSize);

        if(pageItems.length===0){ container.innerHTML = `<p class="text-sm text-slate-500">Tidak ada pelamar yang sesuai untuk lowongan <b>${job.title}</b>.</p>`; renderApplicantsPagination(total, pages); return; }

        container.innerHTML = pageItems.map(a=>{
            const p = profiles[a.userId] || { name: a.userId, email: '' };
            return `<div class="border rounded p-3 flex justify-between items-start"><div><h4 class="font-bold">${p.name||'Pelamar'}</h4><p class="text-sm text-slate-600">${p.email||''}</p><p class="text-xs text-slate-500 mt-1">Tanggal: ${new Date(a.date).toLocaleString()}</p><p class="text-sm mt-2">Status: <b>${a.status||'Submitted'}</b></p></div><div class="flex flex-col gap-2"><button onclick="viewApplicantDetail(${jobId}, '${a.userId}')" class="px-3 py-1 bg-slate-50 rounded">Detail</button><button onclick="sendMessageToApplicant(${jobId}, '${a.userId}')" class="px-3 py-1 bg-primary text-white rounded">Pesan</button><button onclick="updateApplicationStatus(${jobId}, '${a.userId}', 'Accepted')" class="px-3 py-1 bg-emerald-50 text-emerald-600 rounded">Terima</button><button onclick="updateApplicationStatus(${jobId}, '${a.userId}', 'Rejected')" class="px-3 py-1 bg-red-50 text-red-600 rounded">Tolak</button><button onclick="scheduleInterview(${jobId}, '${a.userId}')" class="px-3 py-1 bg-slate-100 rounded">Jadwalkan Interview</button></div></div>`;
        }).join('');

        renderApplicantsPagination(total, pages);
    }

    function renderApplicantsPagination(totalItems, totalPages){
        const el = document.getElementById('companyApplicantsPagination');
        if(!el) return;
        if(totalPages <= 1){ el.innerHTML = ''; return; }
        const prevDisabled = companyApplicantsPage <= 1;
        const nextDisabled = companyApplicantsPage >= totalPages;
        el.innerHTML = `
            <button ${prevDisabled? 'disabled':''} onclick="changeApplicantsPage(${companyApplicantsPage-1})" class="px-3 py-1 bg-slate-100 rounded ${prevDisabled? 'opacity-50':''}">Prev</button>
            <span class="text-sm">Halaman ${companyApplicantsPage} / ${totalPages} • ${totalItems} pelamar</span>
            <button ${nextDisabled? 'disabled':''} onclick="changeApplicantsPage(${companyApplicantsPage+1})" class="px-3 py-1 bg-slate-100 rounded ${nextDisabled? 'opacity-50':''}">Next</button>
        `;
    }

    function changeApplicantsPage(page){
        if(!currentApplicantsJobId) return;
        if(page < 1) page = 1;
        renderJobApplicants(currentApplicantsJobId, page);
    }

    function filterApplicants(){
        // resets to page 1
        if(!currentApplicantsJobId) return;
        renderJobApplicants(currentApplicantsJobId, 1);
    }

    // Applicant detail modal & messaging
    function getMessages(){ return JSON.parse(localStorage.getItem('satata_messages')||'[]'); }
    function saveMessage(msg){
        // ensure consistent shape
        if(msg.read === undefined) msg.read = false;
        const m = getMessages(); m.push(msg); localStorage.setItem('satata_messages', JSON.stringify(m));
        renderMessageBadge();
    }

    function getUnreadCount(){
        const uid = getCurrentUserId(); if(!uid) return 0;
        const msgs = getMessages();
        return msgs.filter(m=> m.to===uid && !m.read).length;
    }

    function renderMessageBadge(){
        const unread = getUnreadCount();
        const headerEl = document.getElementById('msgBadge'); if(headerEl){ if(unread>0){ headerEl.textContent = unread; headerEl.classList.remove('hidden'); } else { headerEl.classList.add('hidden'); } }
        const sidebarEl = document.getElementById('sidebarMsgBadge'); if(sidebarEl){ if(unread>0){ sidebarEl.textContent = unread; sidebarEl.classList.remove('hidden'); } else { sidebarEl.classList.add('hidden'); } }
    }

    function markMessagesReadWith(partnerId){
        const uid = getCurrentUserId(); if(!uid) return;
        const msgs = getMessages();
        let changed = false;
        msgs.forEach(m=>{ if(m.to===uid && m.from===partnerId && !m.read){ m.read = true; changed = true; } });
        if(changed) localStorage.setItem('satata_messages', JSON.stringify(msgs));
        renderMessageBadge();
    }

    function viewApplicantDetail(jobId, applicantId){
        const profiles = getProfiles();
        const p = profiles[applicantId] || { name: 'Pelamar', email: '' };
        const modal = document.getElementById('applicantDetailModal');
        if(!modal) return alert('Modal detail pelamar tidak ditemukan');
        modal.querySelector('#ap-name').textContent = p.name || '';
        modal.querySelector('#ap-email').textContent = p.email || '';
        modal.querySelector('#ap-phone').textContent = p.phone || '';
        modal.querySelector('#ap-city').textContent = p.city || '';
        modal.querySelector('#ap-disability').textContent = p.disability || '';
        const cvLink = modal.querySelector('#ap-cv');
        if(p.cv){ cvLink.href = p.cv; cvLink.classList.remove('hidden'); } else { cvLink.classList.add('hidden'); }
        modal.dataset.jobId = jobId;
        modal.dataset.applicantId = applicantId;
        modal.classList.remove('hidden');
    }

    function closeApplicantModal(){ const m = document.getElementById('applicantDetailModal'); if(m) m.classList.add('hidden'); }

    function sendMessageToApplicant(jobId, applicantId){
        // open modal message composer if modal exists
        const modal = document.getElementById('applicantDetailModal');
        if(!modal){ alert('Modal tidak ditemukan'); return; }
        // if modal not showing the requested applicant, open details first
        if(modal.dataset.applicantId !== applicantId){ viewApplicantDetail(jobId, applicantId); }
        // focus message input
        const textarea = modal.querySelector('#ap-message');
        if(textarea){ textarea.focus(); }
        // change send button to send for this applicant
        modal.querySelector('#ap-send').onclick = function(){
            const body = modal.querySelector('#ap-message').value.trim();
            if(!body) return alert('Tulis pesan terlebih dahulu');
            const fromId = getCurrentUserId() || 'company';
            const msg = { id: uid('m'), jobId: jobId, to: applicantId, from: fromId, body, date: Date.now(), read: false };
            saveMessage(msg);
            addNotification({ message: `Anda menerima pesan dari perusahaan: ${body.slice(0,80)}`, userId: applicantId, type: 'message' });
            modal.querySelector('#ap-message').value = '';
            // auto-open inbox and thread for the recipient (for demo we open current user's inbox)
            if(typeof showSection === 'function') showSection('inbox');
            if(typeof renderInbox === 'function') renderInbox();
            // open the thread between sender and recipient; if sender is current user, partner is applicantId
            const senderId = fromId;
            // if current user is company and sent message, open thread view for company (so they see the conversation)
            if(typeof openThread === 'function') openThread(applicantId);
            alert('Pesan terkirim ke pelamar.');
        };
    }

    function scheduleInterview(jobId, applicantId){
        const date = prompt('Masukkan tanggal & waktu interview (contoh: 2026-06-20 10:00):');
        if(!date) return;
        const apps = getApplications();
        const idx = apps.findIndex(a=>Number(a.jobId)===Number(jobId) && a.userId===applicantId);
        if(idx===-1) return alert('Lamaran tidak ditemukan');
        apps[idx].interview = date;
        apps[idx].status = 'Interview Scheduled';
        localStorage.setItem('satata_applications', JSON.stringify(apps));
        addNotification({ message: `Anda dijadwalkan interview untuk lowongan pada ${date}`, userId: applicantId, type: 'interview' });
        renderJobApplicants(jobId);
        alert('Interview dijadwalkan dan pelamar diberi notifikasi.');
    }

    function updateApplicationStatus(jobId, applicantId, status){
        const apps = getApplications();
        const idx = apps.findIndex(a=>Number(a.jobId)===Number(jobId) && a.userId===applicantId);
        if(idx===-1) return alert('Lamaran tidak ditemukan');
        apps[idx].status = status;
        localStorage.setItem('satata_applications', JSON.stringify(apps));
        addNotification({ message: `Status lamaran Anda telah diperbarui: ${status}`, userId: applicantId, type: 'application' });
        renderJobApplicants(jobId);
    }

    // Admin functions
    function renderAdminUsers(){
        const el = document.getElementById('adminContent');
        const accounts = JSON.parse(localStorage.getItem('satata_accounts')||'{}');
        const rows = Object.values(accounts).map(a=>`<div class="border-b py-2 flex justify-between"><div><b>${a.name}</b><div class="text-sm text-slate-600">${a.email}</div></div><div><button onclick="adminDeleteUser('${a.email}')" class="px-2 py-1 bg-red-100 text-red-600 rounded">Hapus</button></div></div>`).join('');
        el.innerHTML = `<h3 class='font-bold mb-2'>Kelola User</h3>${rows||'<p class="text-sm text-slate-500">Tidak ada user.</p>'}`;
    }
    function adminDeleteUser(email){
        if(!confirm('Hapus user ini?')) return;
        const accounts = JSON.parse(localStorage.getItem('satata_accounts')||'{}');
        delete accounts[email];
        localStorage.setItem('satata_accounts', JSON.stringify(accounts));
        renderAdminUsers();
    }
    function renderAdminCompanies(){
        const el = document.getElementById('adminContent');
        const companies = getCompanies();
        el.innerHTML = `<h3 class='font-bold mb-2'>Kelola Perusahaan</h3>` + (companies.map(c=>`<div class="border-b py-2 flex justify-between"><div><b>${c.name}</b><div class="text-sm text-slate-600">${c.location}</div></div><div><button onclick="adminDeleteCompany('${c.id}')" class="px-2 py-1 bg-red-100 text-red-600 rounded">Hapus</button></div></div>`).join('')||'<p class="text-sm text-slate-500">Tidak ada perusahaan.</p>');
    }
    function adminDeleteCompany(id){
        if(!confirm('Hapus perusahaan ini?')) return;
        const companies = getCompanies().filter(c=>c.id!==id);
        saveCompanies(companies);
        renderAdminCompanies();
    }
    function renderAdminJobs(){
        const el = document.getElementById('adminContent');
        const jobs = getJobs();
        el.innerHTML = `<h3 class='font-bold mb-2'>Kelola Lowongan</h3>` + (jobs.map(j=>`<div class="border-b py-2 flex justify-between"><div><b>${j.title}</b><div class="text-sm text-slate-600">${j.company}</div></div><div><button onclick="deleteJob(${j.id})" class="px-2 py-1 bg-red-100 text-red-600 rounded">Hapus</button></div></div>`).join('')||'<p class="text-sm text-slate-500">Tidak ada lowongan.</p>');
    }
    function renderAdminStats(){
        const el = document.getElementById('adminContent');
        const users = Object.keys(JSON.parse(localStorage.getItem('satata_accounts')||'{}')).length;
        const jobs = getJobs().length;
        const companies = getCompanies().length;
        el.innerHTML = `<h3 class='font-bold mb-2'>Statistik Platform</h3><p class="text-sm">Users: ${users}</p><p class="text-sm">Jobs: ${jobs}</p><p class="text-sm">Companies: ${companies}</p>`;
    }

    // Dark mode
    function toggleDarkMode(){
        const root = document.documentElement;
        root.classList.toggle('dark');
        const isDark = root.classList.contains('dark');
        localStorage.setItem('satata_theme', isDark? 'dark':'light');
    }
    function applyStoredTheme(){
        const t = localStorage.getItem('satata_theme')||'light';
        if(t==='dark') document.documentElement.classList.add('dark');
        else document.documentElement.classList.remove('dark');
    }

    // Applications (Lamaran Saya)
    function getApplications(){
        return JSON.parse(localStorage.getItem('satata_applications')||'[]');
    }
    function saveApplication(app){
        const apps = getApplications();
        apps.push(app);
        localStorage.setItem('satata_applications', JSON.stringify(apps));
    }
    function renderApplications(){
        const container = document.getElementById('applicationsList');
        if(!container) return;
        const uid = getCurrentUserId();
        if(!uid){ container.innerHTML = '<p class="text-sm text-slate-500">Silakan login untuk melihat lamaran Anda.</p>'; return; }
        const apps = getApplications().filter(a=>a.userId===uid);
        if(apps.length===0){ container.innerHTML = '<p class="text-sm text-slate-500">Belum ada lamaran.</p>'; return; }
        const jobs = getJobs();
        container.innerHTML = apps.map(a=>{
            const job = jobs.find(j=>j.id===a.jobId)||{};
            return `<div class="border-b py-3"><h4 class="font-bold">${job.title||'Lowongan'} - ${job.company||''}</h4><p class="text-sm text-slate-600">Tanggal: ${new Date(a.date).toLocaleString()} • Status: ${a.status}</p></div>`;
        }).join('');
    }

    // Notifications
    function getNotifications(){ return JSON.parse(localStorage.getItem('satata_notifications')||'[]'); }
    function setNotifications(n){ localStorage.setItem('satata_notifications', JSON.stringify(n)); }
    function addNotification(n){
        const list = getNotifications();
        list.unshift({ id: uid('n'), read: false, date: Date.now(), ...n });
        setNotifications(list);
        renderNotificationBadge();
    }
    function renderNotificationBadge(){
        const badge = document.getElementById('notifBadge');
        if(!badge) return;
        const unread = getNotifications().filter(n=>!n.read).length;
        if(unread>0){ badge.textContent = unread; badge.classList.remove('hidden'); } else { badge.classList.add('hidden'); }
    }
    function renderNotificationsList(){
        const container = document.getElementById('notificationsList');
        if(!container) return;
        const nots = getNotifications();
        if(nots.length===0){ container.innerHTML = '<p class="text-sm text-slate-500">Belum ada notifikasi.</p>'; return; }
        container.innerHTML = nots.map(n=>`<div class="border-b py-3 ${n.read? 'opacity-60':''}"><p class="text-sm">${n.message}</p><p class="text-xs text-slate-400">${new Date(n.date).toLocaleString()}</p></div>`).join('');
    }
    function markAllNotificationsRead(){
        const nots = getNotifications().map(n=>({ ...n, read:true }));
        setNotifications(nots);
        renderNotificationBadge();
        renderNotificationsList();
    }

    function renderJobDetail(id){
        const jobs = getJobs();
        const job = jobs.find(j=>String(j.id)===String(id));
        if(!job) return alert('Lowongan tidak ditemukan');

        // create detail container
        let detail = document.getElementById('job-detail-overlay');
        if(detail) detail.remove();
        detail = document.createElement('div');
        detail.id = 'job-detail-overlay';
        detail.className = 'fixed inset-0 bg-white z-[300] overflow-auto p-6';
        detail.innerHTML = `
            <div class="max-w-4xl mx-auto">
                <button id="closeJobDetail" class="mb-4 px-3 py-2 bg-slate-100 rounded-md">Kembali</button>
                <h1 class="text-2xl font-bold mb-2">${job.title}</h1>
                <p class="text-sm text-slate-600 mb-4">${job.company} • ${job.location}</p>
                <div class="mb-4 flex gap-3 items-center">
                    <div class="text-emerald-600 font-bold text-sm bg-emerald-50 px-2.5 py-1 rounded">AI Match ${job.aiMatch}%</div>
                    <div class="text-sm text-slate-500">${job.salary}</div>
                </div>
                <div class="mb-6">
                    <h3 class="font-semibold mb-2">Deskripsi</h3>
                    <p class="text-slate-700">${job.description}</p>
                </div>
                <div class="mb-6 grid md:grid-cols-2 gap-4">
                    <div>
                        <h4 class="font-semibold mb-2">Benefit</h4>
                        <ul class="list-disc ml-5 text-slate-700">${job.benefit.map(b=>`<li>${b}</li>`).join('')}</ul>
                    </div>
                    <div>
                        <h4 class="font-semibold mb-2">Persyaratan</h4>
                        <ul class="list-disc ml-5 text-slate-700">${job.requirements.map(r=>`<li>${r}</li>`).join('')}</ul>
                    </div>
                </div>
                <div class="flex gap-3 mb-8">
                    <button id="applyNow" class="px-4 py-2 bg-primary text-white rounded-lg">Lamar Sekarang</button>
                    <button id="saveDetail" class="px-4 py-2 bg-slate-100 rounded-lg">Simpan</button>
                </div>
            </div>
        `;
        document.body.appendChild(detail);
        document.getElementById('closeJobDetail').addEventListener('click', ()=>{ detail.remove(); history.pushState('', document.title, window.location.pathname+window.location.search); });
        document.getElementById('applyNow').addEventListener('click', ()=>{
            const uid = getCurrentUserId();
            if(!uid){ if(confirm('Silakan login untuk melamar. Buka halaman login sekarang?')) showSection('login'); return; }
            const app = { id: uid('app'), jobId: Number(id), userId: uid, date: Date.now(), status: 'Submitted' };
            saveApplication(app);
            addNotification({ message: `Lamaran Anda untuk ${job.title} telah dikirim.`, type: 'application' });
            alert('Lamaran terkirim. Anda akan menerima notifikasi jika ada update.');
            detail.remove();
            // update applications list
            renderApplications();
            if(typeof showSection === 'function') showSection('applications');
        });
        document.getElementById('saveDetail').addEventListener('click', ()=>{ toggleSave(Number(id)); renderSavedJobs(); alert('Lowongan disimpan.'); });
    }

    // --- GLOBAL SEARCH (jobs + messages) ---
    function openGlobalSearch(){
        const ov = document.getElementById('globalSearchOverlay'); if(!ov) return;
        const gi = document.getElementById('globalSearchInput'); if(gi) gi.value = document.getElementById('searchInput')? document.getElementById('searchInput').value : '';
        // build filter options
        buildGlobalFilterOptions();
        ov.classList.remove('hidden');
        setTimeout(()=>{ const gi2 = document.getElementById('globalSearchInput'); if(gi2) gi2.focus(); },50);
        renderGlobalSearchResults(gi? gi.value : '');
        // wire input for realtime
        if(gi){ gi.oninput = function(e){ renderGlobalSearchResults(e.target.value); } }
    }

    function buildGlobalFilterOptions(){
        const locSel = document.getElementById('globalFilterLocation');
        const accomWrap = document.getElementById('globalFilterAccom');
        if(!locSel || !accomWrap) return;
        // populate locations
        const jobs = getJobs();
        const locs = Array.from(new Set(jobs.map(j=>j.location.split(' (')[0]))).sort();
        locSel.innerHTML = '<option value="">Semua Lokasi</option>' + locs.map(l=>`<option value="${l}">${l}</option>`).join('');
        // accommodations
        const accoms = ['wheelchair','screen_reader','remote','adjustable_workstation','sign_language','assistive_tech','flexible_hours','accessible_parking'];
        accomWrap.innerHTML = accoms.map(a=>`<label class="inline-flex items-center gap-2"><input type="checkbox" value="${a}" onchange="renderGlobalSearchResults(document.getElementById('globalSearchInput').value)"/> <span class="text-sm">${a.replace(/_/g,' ')}</span></label>`).join(' ');
    }

    function closeGlobalSearch(){ const ov = document.getElementById('globalSearchOverlay'); if(ov) ov.classList.add('hidden'); }

    function renderGlobalSearchResults(query, page=1){
        query = (query||'').trim().toLowerCase();
        const jobsContainer = document.getElementById('globalJobsResults');
        const msgsContainer = document.getElementById('globalMessagesResults');
        const paginationEl = document.getElementById('globalJobsPagination');
        if(!jobsContainer || !msgsContainer || !paginationEl) return;
        const jobs = getJobs();

        // read filters
        const loc = (document.getElementById('globalFilterLocation')||{}).value || '';
        const salary = (document.getElementById('globalFilterSalary')||{}).value || '';
        const perPage = Number((document.getElementById('globalPerPage')||{}).value || 10);
        const onlyRemote = document.getElementById('globalFilterRemote') && document.getElementById('globalFilterRemote').checked;
        const accomSelected = Array.from(document.querySelectorAll('#globalFilterAccom input[type="checkbox"]:checked')).map(i=>i.value);

        let filtered = jobs.filter(j=>{
            const hay = (j.title + ' ' + j.company + ' ' + (j.description||'')).toLowerCase();
            if(query && !hay.includes(query)) return false;
            if(loc && !j.location.toLowerCase().includes(loc.toLowerCase())) return false;
            if(salary && j.salary !== salary) return false;
            if(onlyRemote && !j.location.toLowerCase().includes('remote')) return false;
            if(accomSelected.length){
                const jobAc = (j.accommodations||[]).map(a=>a.toLowerCase());
                if(!accomSelected.every(a=> jobAc.includes(a))) return false;
            }
            return true;
        });

        const total = filtered.length;
        const pages = Math.max(1, Math.ceil(total / perPage));
        if(page < 1) page = 1; if(page > pages) page = pages;
        const start = (page - 1) * perPage;
        const pageItems = filtered.slice(start, start + perPage);

        if(pageItems.length===0) jobsContainer.innerHTML = '<p class="text-sm text-slate-500">Tidak ada lowongan ditemukan.</p>'; else {
            jobsContainer.innerHTML = pageItems.map(j=>`<div class="border-b py-2"><a href="#/job/${j.id}" onclick="closeGlobalSearch(); setTimeout(()=>{ renderJobDetail(${j.id}) },50)" class="font-semibold text-primary">${j.title}</a><div class="text-sm text-slate-600">${j.company} • ${j.location} • ${j.salary}</div></div>`).join('');
        }
        // pagination controls
        paginationEl.innerHTML = `<div class="text-sm">Menampilkan ${start+1}-${Math.min(start+perPage, total)} dari ${total}</div><div class="flex gap-2"><button ${page<=1? 'disabled':''} onclick="renderGlobalSearchResults(document.getElementById('globalSearchInput').value, ${page-1})" class="px-3 py-1 bg-slate-100 rounded ${page<=1? 'opacity-50':''}">Prev</button><div class="px-3 py-1">Halaman ${page}/${pages}</div><button ${page>=pages? 'disabled':''} onclick="renderGlobalSearchResults(document.getElementById('globalSearchInput').value, ${page+1})" class="px-3 py-1 bg-slate-100 rounded ${page>=pages? 'opacity-50':''}">Next</button></div>`;

        // messages: search messages where user is involved
        const uid = getCurrentUserId();
        const msgs = getMessages();
        let matchedMsgs = [];
        if(uid){
            matchedMsgs = msgs.filter(m=> (
                (m.from===uid || m.to===uid) && ( !query || (m.body||'').toLowerCase().includes(query) )
            )).slice(-200).reverse();
        }
        if(matchedMsgs.length===0) msgsContainer.innerHTML = '<p class="text-sm text-slate-500">Tidak ada pesan terkait.</p>'; else {
            const profiles = getProfiles();
            msgsContainer.innerHTML = matchedMsgs.map(m=>{
                const other = (m.from===uid)? (profiles[m.to]||{name:m.to}) : (profiles[m.from]||{name:m.from});
                const who = other.name || other.email || other.id || other;
                return `<div class="border-b py-2"><div class="text-sm text-slate-700">${m.body.slice(0,120)}</div><div class="text-xs text-slate-500">${who} • ${new Date(m.date).toLocaleString()}</div><div class="mt-1"><button onclick="closeGlobalSearch(); openThread('${m.from===uid? m.to: m.from}')" class="text-sm px-2 py-1 bg-slate-100 rounded">Buka Percakapan</button></div></div>`;
            }).join('');
        }
    }

    function navigateTo(route){
        if(!route) route = '/jobs';
        if(location.hash !== '#'+route) location.hash = '#'+route;
        router();
    }

    function router(){
        const raw = location.hash || '#/jobs';
        // job detail route
        if(raw.startsWith('#/job/')){
            const id = raw.split('/')[2];
            renderJobDetail(id);
            return;
        }

        const route = raw.replace(/^#/, '');

        // common mapping
        if(route === '/jobs' || route === '/'){
            showSection('jobs');
            renderJobList();
            return;
        }
        if(route === '/profile'){
            showSection('profile');
            loadProfileData();
            return;
        }
        if(route === '/company'){
            showSection('company');
            return;
        }
        if(route === '/company-dashboard'){
            // show company dashboard and refresh jobs list
            // hide standard sections first
            const sections = ['jobs-section','profile-section','company-section','saved-section','dashboard-section','login-section','register-section','applications-section','notifications-section','admin-section','company-dashboard'];
            sections.forEach(id=>{ const el = document.getElementById(id); if(el) el.classList.add('hidden'); });
            const cd = document.getElementById('company-dashboard'); if(cd) cd.classList.remove('hidden');
            renderCompanyJobs();
            return;
        }
        if(route === '/saved'){
            showSection('saved');
            renderSavedJobs();
            return;
        }
        if(route === '/dashboard'){
            showSection('dashboard');
            return;
        }
        if(route === '/login'){
            showSection('login');
            return;
        }
        if(route === '/register'){
            showSection('register');
            return;
        }
        if(route === '/applications'){
            showSection('applications');
            renderApplications();
            return;
        }
        if(route === '/notifications'){
            showSection('notifications');
            renderNotificationsList();
            markAllNotificationsRead();
            return;
        }
        if(route === '/admin'){
            // show admin panel
            const sections = ['jobs-section','profile-section','company-section','saved-section','dashboard-section','login-section','register-section','applications-section','notifications-section','company-dashboard','admin-section'];
            sections.forEach(id=>{ const el = document.getElementById(id); if(el) el.classList.add('hidden'); });
            const ad = document.getElementById('admin-section'); if(ad) ad.classList.remove('hidden');
            return;
        }

        // default
        showSection('jobs');
        renderJobList();
    }

    // init
    document.addEventListener('DOMContentLoaded', ()=>{
        seedStorage();
        applyStoredTheme();
        renderJobList();
        renderSavedJobs();
        renderApplications();
        renderNotificationBadge();
        renderMessageBadge();
        window.addEventListener('hashchange', router);
        // initial route handling
        router();
        // expose auth functions
        window.registerUser = async function(){
            const name = document.getElementById('registerName').value.trim();
            const email = document.getElementById('registerEmail').value.trim().toLowerCase();
            const password = document.getElementById('registerPassword').value;
            const role = (document.getElementById('registerRole') && document.getElementById('registerRole').value) || 'user';
            const companyName = document.getElementById('registerCompanyName')? document.getElementById('registerCompanyName').value.trim() : '';
            if(!name || !email || !password){ alert('Lengkapi semua field pendaftaran'); return; }
            const accounts = JSON.parse(localStorage.getItem('satata_accounts')||'{}');
            if(accounts[email]){ alert('Email sudah terdaftar'); return; }
            const userId = uid('u');
            accounts[email] = { id: userId, name, email, password, role };

            // if company registering, create company record and attach
            if(role === 'company'){
                const companies = JSON.parse(localStorage.getItem('satata_companies')||'[]');
                const newCo = { id: uid('co'), name: companyName || (name + ' Company'), location: 'Unknown', size: '1-50' };
                companies.push(newCo);
                localStorage.setItem('satata_companies', JSON.stringify(companies));
                accounts[email].companyId = newCo.id;
            }

            localStorage.setItem('satata_accounts', JSON.stringify(accounts));
            // create profile
            const profiles = JSON.parse(localStorage.getItem('satata_profiles')||'{}');
            profiles[userId] = { name, role: role==='company'? 'Company' : '', email, phone: '', location: '', address:'', city:'', education:'', disability:'', workExperience: [], skills: [] };
            localStorage.setItem('satata_profiles', JSON.stringify(profiles));
            localStorage.setItem('satata_current_user', userId);
            alert('Pendaftaran berhasil - Anda masuk sekarang');
            if(typeof loadProfileData === 'function') loadProfileData();
            if(typeof showSection === 'function') showSection('dashboard');
            addNotification({ message: `Selamat datang ${name}! Akun Anda telah dibuat.`, type: 'welcome' });
        };

        window.loginUser = function(){
            const email = document.getElementById('loginEmail').value.trim().toLowerCase();
            const password = document.getElementById('loginPassword').value;
            const accounts = JSON.parse(localStorage.getItem('satata_accounts')||'{}');
            if(!accounts[email] || accounts[email].password !== password){ alert('Email atau password salah'); return; }
            const acc = accounts[email];
            localStorage.setItem('satata_current_user', acc.id);
            alert('Login berhasil');
            if(typeof loadProfileData === 'function') loadProfileData();
            // redirect by role
            if(acc.role === 'admin'){
                if(typeof showSection === 'function') showSection('admin');
            } else if(acc.role === 'company'){
                if(typeof showSection === 'function') showSection('company-dashboard');
                // ensure company jobs refreshed
                if(typeof renderCompanyJobs === 'function') renderCompanyJobs();
            } else {
                if(typeof showSection === 'function') showSection('dashboard');
            }
        };

        window.logoutUser = function(){
            localStorage.removeItem('satata_current_user');
            alert('Anda berhasil logout');
            if(typeof showSection === 'function') showSection('jobs');
        };
        // expose renderers for inline scripts
        // --- INBOX / MESSAGING ---
        function getMessages(){ return JSON.parse(localStorage.getItem('satata_messages')||'[]'); }
        function saveMessage(msg){ const m = getMessages(); m.push(msg); localStorage.setItem('satata_messages', JSON.stringify(m)); }

        function getConversations(){
            const uid = getCurrentUserId();
            if(!uid) return [];
            const msgs = getMessages();
            const partners = {};
            msgs.forEach(m=>{
                if(m.from === uid) partners[m.to] = true;
                if(m.to === uid) partners[m.from] = true;
            });
            return Object.keys(partners).map(pid=>{
                const thread = msgs.filter(t=> (t.from===uid && t.to===pid) || (t.from===pid && t.to===uid)).sort((a,b)=>b.date-a.date);
                return { partnerId: pid, last: thread[0] };
            }).sort((a,b)=> (b.last?.date||0) - (a.last?.date||0));
        }

        function getUnreadCountWith(partnerId){
            const uid = getCurrentUserId(); if(!uid) return 0;
            const msgs = getMessages();
            return msgs.filter(m=> m.from===partnerId && m.to===uid && !m.read).length;
        }

        let _lastRenderedConversations = [];
        function filterThreads(q){
            const query = (q||'').trim().toLowerCase();
            const convs = getConversations();
            _lastRenderedConversations = convs;
            const threadsEl = document.getElementById('threadsList');
            const profiles = getProfiles();
            if(!threadsEl) return;
            const filtered = convs.filter(c=>{
                const p = profiles[c.partnerId] || { name: c.partnerId };
                const name = (p.name||'').toLowerCase();
                const preview = (c.last?.body||'').toLowerCase();
                return !query || name.includes(query) || preview.includes(query) || c.partnerId.toLowerCase().includes(query);
            });
            if(filtered.length===0){ threadsEl.innerHTML = '<p class="text-sm text-slate-500">Tidak ada percakapan yang cocok.</p>'; return; }
            threadsEl.innerHTML = filtered.map(c=>{
                const p = profiles[c.partnerId] || { name: c.partnerId };
                const preview = c.last? c.last.body.slice(0,80) : '';
                const time = c.last? new Date(c.last.date).toLocaleString() : '';
                const unread = getUnreadCountWith(c.partnerId);
                return `<button onclick="openThread('${c.partnerId}')" class="w-full text-left p-2 rounded hover:bg-slate-50 flex justify-between items-start"><div><div class=\"font-semibold\">${p.name||'Pengguna'} ${unread? '<span class=\"ml-2 inline-block bg-red-500 text-white text-xs px-2 py-0.5 rounded\">'+unread+'</span>':''}</div><div class=\"text-xs text-slate-500 truncate\">${preview}</div></div><div class=\"text-xs text-slate-400 ml-3\">${time}</div></button>`;
            }).join('');
        }

        function renderInbox(){
            const uid = getCurrentUserId();
            const threadsEl = document.getElementById('threadsList');
            const view = document.getElementById('threadView');
            if(!threadsEl || !view) return;
            if(!uid){ threadsEl.innerHTML = '<p class="text-sm text-slate-500">Silakan login untuk melihat inbox.</p>'; view.innerHTML = ''; return; }
            const profiles = getProfiles();
            const convs = getConversations();
                if(convs.length===0){ threadsEl.innerHTML = '<div class="flex justify-between items-center mb-2"><h4 class="font-semibold">Percakapan</h4><button onclick="openCompose()" class="text-sm px-2 py-1 bg-primary text-white rounded">Compose</button></div><p class="text-sm text-slate-500">Belum ada percakapan.</p>'; view.innerHTML = '<p class="text-sm text-slate-500">Pilih percakapan untuk mulai berkirim pesan.</p>'; return; }
                // render including unread indicator
                threadsEl.innerHTML = '';
                // prefill search box
                const searchInput = document.getElementById('threadSearch'); if(searchInput) searchInput.value = '';
                filterThreads('');
            view.innerHTML = '<p class="text-sm text-slate-500">Pilih percakapan di kiri untuk melihat pesan.</p>';
        }

        function openThread(partnerId){
            const uid = getCurrentUserId();
            if(!uid) return alert('Silakan login untuk membuka percakapan.');
            // mark messages as read for this partner first
            markMessagesReadWith(partnerId);
            const msgs = getMessages().filter(m=> (m.from===uid && m.to===partnerId) || (m.from===partnerId && m.to===uid)).sort((a,b)=>a.date-b.date);
            const profiles = getProfiles();
            const partner = profiles[partnerId] || { name: partnerId };
            const view = document.getElementById('threadView');
            if(!view) return;
            view.innerHTML = `
                <div class="flex items-center justify-between mb-4">
                    <div>
                        <h3 class="font-bold">${partner.name||'Pengguna'}</h3>
                        <p class="text-xs text-slate-500">ID: ${partnerId}</p>
                    </div>
                </div>
                <div id="messagesArea" class="space-y-3 max-h-[55vh] overflow-y-auto p-2 border rounded mb-3">
                    ${msgs.map(m=>{
                        const isMe = m.from===uid;
                        return `<div class=\"flex ${isMe? 'justify-end':'justify-start'}\"><div class=\"max-w-[70%] p-3 rounded-lg ${isMe? 'bg-primary text-white':'bg-slate-100 text-slate-800'}\">${m.body}<div class=\"text-[11px] text-slate-400 mt-1 text-right\">${new Date(m.date).toLocaleString()}</div></div></div>`;
                    }).join('')}
                </div>
                <div class="flex gap-2">
                    <textarea id="msgInput" class="flex-1 border px-3 py-2 rounded" rows="2" placeholder="Tulis pesan..."></textarea>
                    <button id="msgSendBtn" class="px-4 py-2 bg-primary text-white rounded">Kirim</button>
                </div>
            `;
            // scroll to bottom
            setTimeout(()=>{ const ma = document.getElementById('messagesArea'); if(ma) ma.scrollTop = ma.scrollHeight; },50);
            // attach send handler and keyboard shortcut (Ctrl+Enter)
            const sendBtn = document.getElementById('msgSendBtn'); if(sendBtn){ sendBtn.onclick = ()=> sendMessageToUser(partnerId); }
            const ta = document.getElementById('msgInput'); if(ta){ ta.addEventListener('keydown', function(e){ if((e.ctrlKey||e.metaKey) && e.key === 'Enter'){ e.preventDefault(); sendMessageToUser(partnerId); } }); ta.focus(); }
            // update badges everywhere
            renderMessageBadge();
        }

        function sendMessageToUser(partnerId){
            const uid = getCurrentUserId();
            if(!uid) return alert('Silakan login untuk mengirim pesan.');
            const ta = document.getElementById('msgInput');
            if(!ta) return;
            const body = ta.value.trim();
            if(!body) return alert('Tulis pesan terlebih dahulu');
            const m = { id: uid('m'), from: uid, to: partnerId, body, date: Date.now() };
                    const msgs = getMessages(); msgs.push(m); localStorage.setItem('satata_messages', JSON.stringify(msgs));
                // notify recipient
                addNotification({ message: `Anda menerima pesan baru: ${body.slice(0,80)}`, userId: partnerId, type: 'message' });
                // refresh thread and inbox list
                    if(typeof renderInbox === 'function') renderInbox();
                    if(typeof openThread === 'function') openThread(partnerId);
                    renderMessageBadge();
        }

        function openCompose(prefillId){
            const modal = document.getElementById('composeModal');
            if(!modal) return;
            const sel = document.getElementById('composeTo');
            sel.innerHTML = '';
            const accounts = JSON.parse(localStorage.getItem('satata_accounts')||'{}');
            const profiles = getProfiles();
            // populate options with known profiles
            Object.values(accounts).forEach(a=>{
                const p = profiles[a.id] || { name: a.name };
                const opt = document.createElement('option'); opt.value = a.id; opt.textContent = `${p.name || a.name} (${a.email})`;
                sel.appendChild(opt);
            });
            if(prefillId){ sel.value = prefillId; }
            modal.classList.remove('hidden');
            // focus body after opening
            setTimeout(()=>{ const b = document.getElementById('composeBody'); if(b) b.focus(); },50);
        }

        function closeComposeModal(){ const m = document.getElementById('composeModal'); if(m) m.classList.add('hidden'); document.getElementById('composeBody').value = ''; }

        function sendNewConversation(){
            const uid = getCurrentUserId(); if(!uid) return alert('Silakan login untuk mengirim pesan.');
            const to = document.getElementById('composeTo').value;
            const body = document.getElementById('composeBody').value.trim();
            if(!to || !body) return alert('Pilih penerima dan tulis pesan');
            const m = { id: uid('m'), from: uid, to, body, date: Date.now() };
            const msgs = getMessages(); msgs.push(m); localStorage.setItem('satata_messages', JSON.stringify(msgs));
            addNotification({ message: `Anda menerima pesan baru: ${body.slice(0,80)}`, userId: to, type: 'message' });
            closeComposeModal(); renderInbox(); openThread(to); renderMessageBadge();
        }

        window.renderSavedJobs = renderSavedJobs;
        window.renderApplications = renderApplications;
        window.renderNotificationsList = renderNotificationsList;
        window.markAllNotificationsRead = markAllNotificationsRead;
        window.renderJobList = renderJobList;
        window.renderNotificationBadge = renderNotificationBadge;
        window.createCompanyJob = createCompanyJob;
        window.renderCompanyJobs = renderCompanyJobs;
        window.deleteJob = deleteJob;
        window.editJob = editJob;
        window.renderJobApplicants = renderJobApplicants;
        window.changeApplicantsPage = changeApplicantsPage;
        window.filterApplicants = filterApplicants;
        window.scheduleInterview = scheduleInterview;
        window.updateApplicationStatus = updateApplicationStatus;
        window.viewApplicantDetail = viewApplicantDetail;
        window.closeApplicantModal = closeApplicantModal;
        window.sendMessageToApplicant = sendMessageToApplicant;
        window.renderAdminUsers = renderAdminUsers;
        window.renderAdminCompanies = renderAdminCompanies;
        window.renderAdminJobs = renderAdminJobs;
        window.renderAdminStats = renderAdminStats;
        window.toggleDarkMode = toggleDarkMode;
        // messaging
        window.renderInbox = renderInbox;
        window.openThread = openThread;
        window.sendMessageToUser = sendMessageToUser;
        window.renderMessageBadge = renderMessageBadge;
        window.markMessagesReadWith = markMessagesReadWith;
    });

})();
