'use client'

import { useActionState } from 'react'
import { registerOrganization } from './actions'

const initialState: { success: boolean; error?: string } = { success: false }

const TYPE_OPTIONS = [
  { label: 'Association', value: 'association' },
  { label: 'Entreprise', value: 'company' },
  { label: 'Auto-entrepreneur', value: 'freelance' },
  { label: 'Autre', value: 'other' },
]

const PRESENCE_OPTIONS = [
  { label: 'Chaque semaine', value: 'chaque semaine' },
  { label: '3 fois par mois', value: '3 fois par mois' },
  { label: '2 fois par mois', value: '2 fois par mois' },
  { label: '1 fois par mois', value: '1 fois par mois' },
]

const CATEGORY_OPTIONS = [
  { label: 'Fruits et légumes', value: 'fruits et legumes' },
  { label: 'Complément alimentaire', value: 'complement alimentaire' },
  { label: 'Conférence', value: 'conference' },
  { label: 'Viandes et charcuteries', value: 'viandes et charcuteries' },
  { label: 'Produits de la mer', value: 'produits de la mer' },
  { label: 'Produits laitiers', value: 'produits laitiers' },
  { label: 'Boulangerie et pâtisserie', value: 'boulangerie et patisserie' },
  { label: 'Produit de la ruche', value: 'produit de la ruche' },
  { label: 'Oeuf et volailles', value: 'oeuf et volailles' },
  { label: 'Boissons locales', value: 'boissons locales' },
  { label: 'Pépinière', value: 'pepiniere' },
  { label: 'Chocolat et confiseries', value: 'chocolat et confiseries' },
  { label: 'Épices et condiments', value: 'epices et condiments' },
  { label: 'Conserve et confitures', value: 'conserve et confitures' },
  { label: 'Articles en bois', value: 'articles en bois' },
  { label: 'Poteries', value: 'poteries' },
  { label: 'Décoration', value: 'decoration' },
  { label: 'Bijoux artisanaux', value: 'bijoux artisanaux' },
  { label: 'Vêtement et accessoires', value: 'vetement et accessoires' },
  { label: 'Bien-être', value: 'bien-etre' },
  { label: 'Cosmétiques', value: 'cosmetiques' },
  { label: 'Papéteries', value: 'papeteries' },
  { label: "Produits d'hygiènes", value: 'produits hygiene' },
  { label: 'Atelier', value: 'atelier' },
  { label: 'Glaces', value: 'glaces' },
  { label: 'Aromatique', value: 'aromatique' },
  { label: 'Restauration', value: 'restauration' },
  { label: 'Sport', value: 'sport' },
  { label: 'Boisson Alcoolisé', value: 'boisson alcoolise' },
]

export default function OrganizationForm() {
  const [state, formAction, pending] = useActionState(
    (_prev: { success: boolean; error?: string }, formData: FormData) =>
      registerOrganization(formData),
    initialState,
  )

  if (state.success) {
    return (
      <div className="register-success">
        <h2>Organisation enregistrée !</h2>
        <p>Votre organisation a été soumise avec succès. Nous reviendrons vers vous prochainement.</p>
        <a href="/compte">Retour à l&apos;accueil</a>
      </div>
    )
  }

  return (
    <form className="register-form" action={formAction}>
      {state.error && <p className="register-error">{state.error}</p>}

      <div className="register-section-title">Informations générales</div>

      <div className="register-field">
        <label htmlFor="name">Nom de l&apos;organisation *</label>
        <input id="name" name="name" type="text" required />
      </div>

      <div className="register-row">
        <div className="register-field">
          <label htmlFor="businessName">Raison sociale</label>
          <input id="businessName" name="businessName" type="text" />
        </div>
        <div className="register-field">
          <label htmlFor="type">Type</label>
          <select id="type" name="type">
            <option value="">— Choisir —</option>
            {TYPE_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="register-row">
        <div className="register-field">
          <label htmlFor="siret">SIRET</label>
          <input id="siret" name="siret" type="text" />
        </div>
        <div className="register-field">
          <label htmlFor="tva">N° TVA</label>
          <input id="tva" name="tva" type="text" />
        </div>
      </div>

      <div className="register-field">
        <label htmlFor="description">Description</label>
        <textarea id="description" name="description" rows={4} />
      </div>

      <div className="register-section-title">Coordonnées</div>

      <div className="register-row">
        <div className="register-field">
          <label htmlFor="phone">Téléphone</label>
          <input id="phone" name="phone" type="tel" />
        </div>
        <div className="register-field">
          <label htmlFor="website">Site web</label>
          <input id="website" name="website" type="url" placeholder="https://" />
        </div>
      </div>

      <div className="register-field">
        <label htmlFor="address1">Adresse</label>
        <input id="address1" name="address1" type="text" />
      </div>

      <div className="register-field">
        <label htmlFor="address2">Complément d&apos;adresse</label>
        <input id="address2" name="address2" type="text" />
      </div>

      <div className="register-row">
        <div className="register-field">
          <label htmlFor="zipcode">Code postal</label>
          <input id="zipcode" name="zipcode" type="text" />
        </div>
        <div className="register-field">
          <label htmlFor="city">Ville</label>
          <input id="city" name="city" type="text" />
        </div>
      </div>

      <div className="register-section-title">Participation au marché</div>

      <div className="register-field">
        <label htmlFor="presence">Fréquence de présence souhaitée</label>
        <select id="presence" name="presence">
          <option value="">— Choisir —</option>
          {PRESENCE_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>

      <div className="register-field">
        <label>Catégorie(s) de produits</label>
        <div className="register-checkboxes">
          {CATEGORY_OPTIONS.map((o) => (
            <label key={o.value} className="register-checkbox-label">
              <input type="checkbox" name="category" value={o.value} />
              {o.label}
            </label>
          ))}
        </div>
      </div>

      <button type="submit" disabled={pending}>
        {pending ? 'Envoi en cours…' : 'Soumettre ma candidature'}
      </button>
    </form>
  )
}
