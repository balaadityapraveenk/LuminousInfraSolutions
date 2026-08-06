import React, { useEffect, useMemo, useState } from 'react';
import './AdminQuotes.css';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:5000';

const fallbackQuoteRequests = [
  {
    id: 'Q-1048',
    name: 'Ravi Kumar',
    company: 'Metro Cold Storage',
    email: 'ravi.kumar@metrocold.in',
    phone: '+91 98480 44120',
    project: 'Substation Construction',
    location: 'Hyderabad, Telangana',
    capacity: '33/11 kV yard expansion',
    budget: 'Rs. 42L - 55L',
    date: '30 Jun 2026',
    status: 'New',
    priority: 'High',
    message: 'Needs a quote for a captive substation upgrade before the monsoon shutdown window closes.',
  },
  {
    id: 'Q-1047',
    name: 'Meera Singh',
    company: 'Sunrise Textiles',
    email: 'meera@sunrisetextiles.co',
    phone: '+91 99871 23018',
    project: 'Rooftop Solar',
    location: 'Warangal, Telangana',
    capacity: '450 kW grid-tied solar',
    budget: 'Rs. 1.8Cr - 2.1Cr',
    date: '29 Jun 2026',
    status: 'Contacted',
    priority: 'Medium',
    message: 'Requested EPC pricing with net-metering support and annual maintenance coverage.',
  },
  {
    id: 'Q-1046',
    name: 'Akhil Reddy',
    company: 'Greenfield Logistics Park',
    email: 'akhil.reddy@gflp.com',
    phone: '+91 91212 77890',
    project: 'Transmission Lines',
    location: 'Vijayawada, Andhra Pradesh',
    capacity: '11 kV feeder line',
    budget: 'Rs. 28L - 36L',
    date: '28 Jun 2026',
    status: 'Quoted',
    priority: 'High',
    message: 'Looking for supply, erection, testing, and commissioning for a new warehouse feeder.',
  },
  {
    id: 'Q-1045',
    name: 'Priya Nair',
    company: 'Nexa EV Charging',
    email: 'priya.nair@nexaev.in',
    phone: '+91 90004 55231',
    project: 'Smart Grid Integration',
    location: 'Bengaluru, Karnataka',
    capacity: '12 fast-charging bays',
    budget: 'Rs. 65L - 80L',
    date: '27 Jun 2026',
    status: 'Site Visit',
    priority: 'Medium',
    message: 'Wants load study, transformer sizing, and protection design for an EV charging hub.',
  },
  {
    id: 'Q-1044',
    name: 'Farhan Ali',
    company: 'CityCare Hospital',
    email: 'farhan.ali@citycare.org',
    phone: '+91 97036 11045',
    project: 'Backup Power Systems',
    location: 'Secunderabad, Telangana',
    capacity: '750 kVA critical backup',
    budget: 'Rs. 38L - 48L',
    date: '25 Jun 2026',
    status: 'New',
    priority: 'Urgent',
    message: 'Hospital expansion needs generator integration, changeover panels, and load segregation.',
  },
];

const filters = ['All', 'New', 'Contacted', 'Site Visit', 'Quoted'];
const statusOptions = ['New', 'Contacted', 'Site Visit', 'Quoted'];

const statusTone = {
  New: 'status-new',
  Contacted: 'status-contacted',
  'Site Visit': 'status-visit',
  Quoted: 'status-quoted',
};

const priorityTone = {
  Urgent: 'priority-urgent',
  High: 'priority-high',
  Medium: 'priority-medium',
};

function mapRequest(row) {
  return {
    id: `Q-${String(row.id).padStart(4, '0')}`,
    databaseId: row.id,
    name: row.name,
    company: row.company || 'Individual Customer',
    email: row.email,
    phone: row.phone || 'Not provided',
    project: row.project,
    location: row.location || 'Location not provided',
    capacity: 'To be assessed',
    budget: 'To be estimated',
    date: row.created_at
      ? new Intl.DateTimeFormat('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(row.created_at))
      : 'Recently',
    status: row.status || 'New',
    priority: row.priority || 'Medium',
    message: row.message,
  };
}

const AdminQuotes = ({ onLogout }) => {
  const [quoteRequests, setQuoteRequests] = useState(fallbackQuoteRequests);
  const [selectedId, setSelectedId] = useState(fallbackQuoteRequests[0].id);
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [loadStatus, setLoadStatus] = useState('loading');
  const [notice, setNotice] = useState('');

  useEffect(() => {
    let isMounted = true;

    async function loadRequests() {
      try {
        const response = await fetch(`${API_BASE_URL}/api/requests`);

        if (!response.ok) {
          throw new Error('Unable to load saved quote requests.');
        }

        const rows = await response.json();
        const savedRequests = rows.map(mapRequest);

        if (isMounted) {
          setQuoteRequests(savedRequests.length > 0 ? savedRequests : []);
          setSelectedId(savedRequests[0]?.id || '');
          setLoadStatus('ready');
        }
      } catch (error) {
        if (isMounted) {
          setLoadStatus('fallback');
          setNotice(`${error.message} Showing sample dashboard data until the API is available.`);
        }
      }
    }

    loadRequests();

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredRequests = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return quoteRequests.filter((request) => {
      const matchesFilter = activeFilter === 'All' || request.status === activeFilter;
      const searchableText = `${request.name} ${request.company} ${request.project} ${request.location}`.toLowerCase();
      const matchesSearch = !normalizedSearch || searchableText.includes(normalizedSearch);

      return matchesFilter && matchesSearch;
    });
  }, [activeFilter, quoteRequests, searchTerm]);

  const selectedRequest = quoteRequests.find((request) => request.id === selectedId) || filteredRequests[0] || quoteRequests[0];

  const metrics = [
    { label: 'Open Requests', value: quoteRequests.filter((request) => request.status !== 'Quoted').length },
    { label: 'New Today', value: quoteRequests.filter((request) => request.status === 'New').length },
    { label: 'High Priority', value: quoteRequests.filter((request) => ['Urgent', 'High'].includes(request.priority)).length },
    { label: 'Quotes Sent', value: quoteRequests.filter((request) => request.status === 'Quoted').length },
  ];

  const updateStatus = async (request, status) => {
    if (!request.databaseId || request.status === status) {
      return;
    }

    const previousRequests = quoteRequests;
    const nextRequests = quoteRequests.map((item) => (
      item.id === request.id ? { ...item, status } : item
    ));

    setQuoteRequests(nextRequests);
    setNotice('');

    try {
      const response = await fetch(`${API_BASE_URL}/api/requests/${request.databaseId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        throw new Error('Could not update status in PostgreSQL.');
      }
    } catch (error) {
      setQuoteRequests(previousRequests);
      setNotice(error.message);
    }
  };

  return (
    <div className="admin-quotes-page">
      <header className="admin-topbar">
        <div className="container admin-topbar-content">
          <div className="admin-brand">
            <svg viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="admin-logo-svg" width="100%" height="100%">
              <ellipse cx="50" cy="40" rx="46" ry="34" fill="#e31e24" />
              <path d="M55 14 L35 40 H47 L45 66 L65 40 H53 Z" fill="#ffffff" />
            </svg>
            <span>Luminous Power Infra - Admin Workspace</span>
          </div>
          <button className="btn btn-secondary logout-btn" onClick={onLogout}>
            Logout
          </button>
        </div>
      </header>

      <section className="admin-quotes-hero">
        <div className="container admin-quotes-hero-grid">
          <div>
            <p className="admin-eyebrow">Admin Workspace</p>
            <h1>Quote Requests</h1>
            <p className="admin-hero-copy">
              Track customers who asked for pricing, review project scope, and move each lead toward a prepared quote.
            </p>
          </div>
          <div className="admin-summary-panel" aria-label="Quote request summary">
            {metrics.map((metric) => (
              <div className="summary-metric" key={metric.label}>
                <span>{metric.label}</span>
                <strong>{metric.value}</strong>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="admin-workspace">
        <div className="container">
          <div className="admin-toolbar">
            <div className="admin-search">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
              <input
                type="search"
                placeholder="Search customers, company, project, or location"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
              />
            </div>
            <div className="admin-filter-group" aria-label="Filter quote requests">
              {filters.map((filter) => (
                <button
                  type="button"
                  className={activeFilter === filter ? 'active' : ''}
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
          {loadStatus === 'loading' && <p className="admin-data-notice">Loading saved quote requests...</p>}
          {notice && <p className="admin-data-notice">{notice}</p>}

          <div className="quotes-layout">
            <div className="quotes-table-shell">
              <div className="quotes-table-header">
                <span>Customer</span>
                <span>Project</span>
                <span>Budget</span>
                <span>Status</span>
              </div>

              <div className="quotes-list">
                {filteredRequests.map((request) => (
                  <button
                    type="button"
                    className={`quote-row ${selectedRequest?.id === request.id ? 'selected' : ''}`}
                    key={request.id}
                    onClick={() => setSelectedId(request.id)}
                  >
                    <span className="customer-cell">
                      <strong>{request.name}</strong>
                      <small>{request.company}</small>
                    </span>
                    <span className="project-cell">
                      <strong>{request.project}</strong>
                      <small>{request.location}</small>
                    </span>
                    <span className="budget-cell">{request.budget}</span>
                    <span className="status-cell">
                      <span className={`status-pill ${statusTone[request.status]}`}>{request.status}</span>
                    </span>
                  </button>
                ))}

                {filteredRequests.length === 0 && (
                  <div className="empty-state">
                    <strong>No quote requests found</strong>
                    <span>Try another status filter or search term.</span>
                  </div>
                )}
              </div>
            </div>

            {selectedRequest && <aside className="quote-detail-panel">
              <div className="detail-heading">
                <div>
                  <span>{selectedRequest.id}</span>
                  <h2>{selectedRequest.name}</h2>
                </div>
                <span className={`priority-pill ${priorityTone[selectedRequest.priority]}`}>{selectedRequest.priority}</span>
              </div>

              <div className="detail-contact">
                <a href={`mailto:${selectedRequest.email}`}>{selectedRequest.email}</a>
                <a href={`tel:${selectedRequest.phone.replace(/\s/g, '')}`}>{selectedRequest.phone}</a>
              </div>

              <dl className="detail-grid">
                <div>
                  <dt>Company</dt>
                  <dd>{selectedRequest.company}</dd>
                </div>
                <div>
                  <dt>Requested</dt>
                  <dd>{selectedRequest.date}</dd>
                </div>
                <div>
                  <dt>Project Scope</dt>
                  <dd>{selectedRequest.project}</dd>
                </div>
                <div>
                  <dt>Capacity</dt>
                  <dd>{selectedRequest.capacity}</dd>
                </div>
                <div>
                  <dt>Location</dt>
                  <dd>{selectedRequest.location}</dd>
                </div>
                <div>
                  <dt>Budget Range</dt>
                  <dd>{selectedRequest.budget}</dd>
                </div>
              </dl>

              <div className="customer-message">
                <span>Customer Note</span>
                <p>{selectedRequest.message}</p>
              </div>

              <div className="status-update-panel">
                <span>Status</span>
                <div className="status-update-buttons">
                  {statusOptions.map((status) => (
                    <button
                      type="button"
                      key={status}
                      className={selectedRequest.status === status ? 'active' : ''}
                      disabled={!selectedRequest.databaseId}
                      onClick={() => updateStatus(selectedRequest, status)}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>

              <div className="detail-actions">
                <a className="btn btn-primary" href={`mailto:${selectedRequest.email}`}>Email Customer</a>
                <a className="btn btn-secondary" href={`tel:${selectedRequest.phone.replace(/\s/g, '')}`}>Call</a>
              </div>
            </aside>}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdminQuotes;
