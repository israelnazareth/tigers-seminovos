"use client";

import { useEffect, useMemo, useState } from "react";
import Footer from "../_components/Footer/Footer";
import { ContactModal } from "../_components/ContactModal/ContactModal";
import VehicleDetailModal from "../_components/VehicleDetailModal/VehicleDetailModal";
import { vehicles, type Body, type Vehicle } from "@/lib/vehicles";
import styles from "./page.module.css";
import Image from "next/image";

export default function CatalogPage() {
  const allVehicles = useMemo(() => vehicles, []);

  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [detailVehicle, setDetailVehicle] = useState<Vehicle | null>(null);
  const [selectedMake, setSelectedMake] = useState<string>("");
  const [selectedModel, setSelectedModel] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedArmor, setSelectedArmor] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const bodies: Body[] = ["Hatch", "Moto", "Picape", "Sedan", "SUV", "Utilitario"];
  const [selectedBodies, setSelectedBodies] = useState<Set<Body>>(new Set());

  const yearOptions = useMemo(() => {
    return Array.from(new Set(allVehicles.map((vehicle) => vehicle.year))).sort();
  }, [allVehicles]);

  const [yearMin, setYearMin] = useState<string>("");
  const [yearMax, setYearMax] = useState<string>("");

  const makeOptions = useMemo(
    () => Array.from(new Set(allVehicles.map((vehicle) => vehicle.make))).sort(),
    [allVehicles]
  );

  const modelOptions = useMemo(() => {
    const base = selectedMake ? allVehicles.filter((vehicle) => vehicle.make === selectedMake) : allVehicles;
    return Array.from(new Set(base.map((vehicle) => vehicle.model))).sort();
  }, [allVehicles, selectedMake]);

  const colorOptions = useMemo(() => {
    const base = selectedModel ? allVehicles.filter((vehicle) => vehicle.model === selectedModel) : allVehicles;
    return Array.from(new Set(base.map((vehicle) => vehicle.color))).sort();
  }, [allVehicles, selectedModel]);

  const armorOptions = useMemo(
    () => Array.from(new Set(allVehicles.map((vehicle) => vehicle.armor))).sort(),
    [allVehicles]
  );

  const toggleBody = (b: Body) => {
    setSelectedBodies((prev) => {
      const next = new Set(prev);
      if (next.has(b)) next.delete(b);
      else next.add(b);
      return next;
    });
  };

  const filtered = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return allVehicles.filter((vehicle) => {
      if (selectedMake && vehicle.make !== selectedMake) return false;
      if (selectedModel && vehicle.model !== selectedModel) return false;
      if (selectedColor && vehicle.color !== selectedColor) return false;
      if (selectedArmor && vehicle.armor !== selectedArmor) return false;
      if (yearMin && vehicle.year < Number(yearMin)) return false;
      if (yearMax && vehicle.year > Number(yearMax)) return false;
      if (selectedBodies.size > 0 && !selectedBodies.has(vehicle.body)) return false;

      if (query) {
        const h = `${vehicle.make} ${vehicle.model} ${vehicle.name} ${vehicle.year} ${vehicle.km} ${vehicle.fuel} ${vehicle.armor} ${vehicle.color} ${vehicle.body}`.toLowerCase();
        if (!h.includes(query)) return false;
      }
      return true;
    });
  }, [allVehicles, selectedMake, selectedModel, selectedColor, selectedArmor, yearMin, yearMax, selectedBodies, searchQuery]);

  const PAGE_SIZE = 12;
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setPage(1), [
    selectedMake, selectedModel, selectedColor, selectedArmor, yearMin, yearMax, selectedBodies, searchQuery
  ]);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setPage((p) => Math.min(Math.max(1, p), totalPages)), [totalPages]);

  const pageItems = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, page]);

  const pagination = useMemo(() => {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }, [totalPages]);

  return (
    <>
      <h1 className={styles.pageTitle}>Nosso Estoque</h1>

      <section className={styles.pageContainer}>
        <aside className={styles.sidebar}>
          <h2 className={styles.sidebarTitle}>Filtros</h2>

          <div className={styles.filtersContainer}>
            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>Marca</label>
              <select
                className={styles.filterSelect}
                value={selectedMake}
                onChange={(e) => {
                  setSelectedMake(e.target.value);
                  setSelectedModel("");
                  setSelectedColor("");
                }}
              >
                <option value="">Todas</option>
                {makeOptions.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>Modelo</label>
              <select
                className={styles.filterSelect}
                value={selectedModel}
                onChange={(e) => {
                  setSelectedModel(e.target.value);
                  setSelectedColor("");
                }}
              >
                <option value="">Todos</option>
                {modelOptions.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>Cor</label>
              <select
                className={styles.filterSelect}
                value={selectedColor}
                onChange={(e) => setSelectedColor(e.target.value)}
              >
                <option value="">Todas</option>
                {colorOptions.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>Blindagem</label>
              <select
                className={styles.filterSelect}
                value={selectedArmor}
                onChange={(e) => setSelectedArmor(e.target.value)}
              >
                <option value="">Selecione uma opção</option>
                {armorOptions.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.yearFilterContainer}>
              <div className={styles.yearFilterTitle}>Ano modelo</div>
              <div className={styles.yearFilterRow}>
                <select
                  className={styles.filterSelect}
                  value={yearMin}
                  onChange={(e) => {
                    const val = e.target.value;
                    setYearMin(val);
                    if (val && yearMax && Number(val) > Number(yearMax)) {
                      setYearMax(val);
                    }
                  }}
                >
                  <option value="">De</option>
                  {yearOptions.map((y) => (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  ))}
                </select>
                <span className={styles.yearFilterSeparator}>até</span>
                <select
                  className={styles.filterSelect}
                  value={yearMax}
                  onChange={(e) => {
                    const val = e.target.value;
                    setYearMax(val);
                    if (val && yearMin && Number(val) < Number(yearMin)) {
                      setYearMin(val);
                    }
                  }}
                >
                  <option value="">Até</option>
                  {yearOptions.map((y) => (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className={styles.bodyTypeContainer}>
              <div className={styles.bodyTypeTitle}>Carroceria</div>
              <div className={styles.bodyTypeList}>
                {bodies.map((b) => {
                  const checked = selectedBodies.has(b);
                  return (
                    <button
                      key={b}
                      type="button"
                      onClick={() => toggleBody(b)}
                      className={styles.bodyTypeButton}
                    >
                      <span
                        className={`${styles.checkbox} ${checked ? styles.checkboxChecked : ""}`}
                        aria-hidden="true"
                      >
                        {checked ? <span className={styles.checkboxIcon}>✓</span> : null}
                      </span>
                      <span className={styles.bodyTypeLabel}>{b}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </aside>

        <section className={styles.mainContent}>
          <div className={styles.headerRow}>
            <div className={styles.searchContainer}>
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Pesquisar"
                className={styles.searchInput}
              />
            </div>
          </div>

          <div className={styles.vehicleGrid}>
            {pageItems.map((car) => {
              const waText = encodeURIComponent(`Olá! Tenho interesse no ${car.name} (${car.year}) cor ${car.color}.`);
              const waHref = `https://wa.me/5500000000000?text=${waText}`;
              return (
                <div
                  key={car.id}
                  className={styles.vehicleCard}
                  onClick={() => setDetailVehicle(car)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setDetailVehicle(car);
                    }
                  }}
                >
                  <Image
                    src={car.image}
                    alt={car.name}
                    className={styles.vehicleImage}
                    width={300}
                    height={300}
                  />
                  <div className={styles.vehicleInfo}>
                    <h3 className={styles.vehicleName}>{car.name}</h3>
                    <div className={styles.vehicleDetails}>
                      <span>
                        {car.km.toLocaleString("pt-BR")} km | {car.year} / {car.year + 1} | {car.color}
                      </span>
                    </div>

                    <button
                      className={styles.simulateButton}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedVehicle(car);
                      }}
                    >
                      Solicitar
                    </button>
                    <a
                      className={styles.contactLink}
                      href={waHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Falar com um atendente
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

          <div className={styles.pagination}>
            <button
              type="button"
              aria-label="Página anterior"
              className={styles.paginationButton}
              disabled={page <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
            >
              ‹
            </button>

            {pagination.map((item) =>
              <button
                key={item}
                type="button"
                onClick={() => setPage(item)}
                className={`${styles.paginationButton} ${item === page ? styles.paginationButtonActive : ""}`}
              >
                {item}
              </button>
            )}

            <button
              type="button"
              aria-label="Próxima página"
              className={styles.paginationButton}
              disabled={page >= totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            >
              ›
            </button>
          </div>
        </section>
      </section>

      {detailVehicle && (
        <VehicleDetailModal
          vehicle={detailVehicle}
          onClose={() => setDetailVehicle(null)}
          onRequestQuote={() => {
            setSelectedVehicle(detailVehicle);
            setDetailVehicle(null);
          }}
        />
      )}

      {selectedVehicle && (
        <ContactModal
          vehicle={selectedVehicle}
          onClose={() => setSelectedVehicle(null)}
        />
      )}
    </>
  );
}
