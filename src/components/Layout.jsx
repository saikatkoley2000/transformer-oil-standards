import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { LayoutDashboard, Table, Library, ArrowRightLeft, Beaker, Shield, Wrench, FileArchive, History, Zap, FileText } from 'lucide-react';

export default function Layout() {
  return (
    <div className="app-container">
      <aside className="sidebar">
        <div className="sidebar-header">
          <h1>Transformer Oil Standards</h1>
        </div>
        <nav className="sidebar-nav">
          <NavLink to="/" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            <LayoutDashboard /> Overview
          </NavLink>
          <NavLink to="/matrix" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            <Table /> Master Matrix
          </NavLink>
          <NavLink to="/library" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            <Library /> Standards Library
          </NavLink>
          <NavLink to="/cross-reference" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            <ArrowRightLeft /> Cross-Reference
          </NavLink>
          <NavLink to="/test-methods" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            <Beaker /> Test Methods
          </NavLink>
          <NavLink to="/specs" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            <Shield /> Specification Standards
          </NavLink>
          <NavLink to="/maintenance" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            <Wrench /> Maintenance & Sampling
          </NavLink>
          <NavLink to="/internal" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            <FileArchive /> Internal Specs
          </NavLink>
          <NavLink to="/historical" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            <History /> Historical / Legacy
          </NavLink>
          <NavLink to="/quick-ref" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            <Zap /> Quick Reference
          </NavLink>
          <NavLink to="/tds" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            <FileText /> TDS - SOTL
          </NavLink>
        </nav>
      </aside>
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}
