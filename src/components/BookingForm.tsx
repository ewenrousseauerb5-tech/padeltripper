'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChevronDown } from 'lucide-react';
import { ALL_EVENTS, FUTURE_EVENTS } from '../data/events';
import { toDualCurrencyDisplay } from '../lib/pricing';

interface BookingFormProps {
  selectedEventId?: number | null;
  priceOverrides?: Record<number, string>;
}

interface BookingResponse {
  ok: boolean;
  error?: string;
  quotation_id?: number;
}

const inputClass =
  'w-full px-4 py-3.5 bg-stone-50 border border-stone-200 rounded-xl focus:border-brand-red focus:outline-none transition-colors text-sm';

const labelClass = 'block text-[11px] font-semibold uppercase tracking-widest text-stone-400 mb-2';

const countryDialCodes = [
  { code: '+44', label: 'United Kingdom' },
  { code: '+34', label: 'Spain' },
  { code: '+31', label: 'Netherlands' },
  { code: '+33', label: 'France' },
  { code: '+49', label: 'Germany' },
  { code: '+1', label: 'United States / Canada' },
  { code: '+353', label: 'Ireland' },
  { code: '+32', label: 'Belgium' },
  { code: '+41', label: 'Switzerland' },
  { code: '+46', label: 'Sweden' },
  { code: '+45', label: 'Denmark' },
  { code: '+47', label: 'Norway' },
  { code: '+358', label: 'Finland' },
  { code: '+39', label: 'Italy' },
  { code: '+351', label: 'Portugal' },
  { code: '+61', label: 'Australia' },
  { code: '+93', label: 'Afghanistan' },
  { code: '+355', label: 'Albania' },
  { code: '+213', label: 'Algeria' },
  { code: '+376', label: 'Andorra' },
  { code: '+244', label: 'Angola' },
  { code: '+1-264', label: 'Anguilla' },
  { code: '+1-268', label: 'Antigua and Barbuda' },
  { code: '+54', label: 'Argentina' },
  { code: '+374', label: 'Armenia' },
  { code: '+297', label: 'Aruba' },
  { code: '+43', label: 'Austria' },
  { code: '+994', label: 'Azerbaijan' },
  { code: '+1-242', label: 'Bahamas' },
  { code: '+973', label: 'Bahrain' },
  { code: '+880', label: 'Bangladesh' },
  { code: '+1-246', label: 'Barbados' },
  { code: '+375', label: 'Belarus' },
  { code: '+501', label: 'Belize' },
  { code: '+229', label: 'Benin' },
  { code: '+1-441', label: 'Bermuda' },
  { code: '+975', label: 'Bhutan' },
  { code: '+591', label: 'Bolivia' },
  { code: '+387', label: 'Bosnia and Herzegovina' },
  { code: '+267', label: 'Botswana' },
  { code: '+55', label: 'Brazil' },
  { code: '+673', label: 'Brunei' },
  { code: '+359', label: 'Bulgaria' },
  { code: '+226', label: 'Burkina Faso' },
  { code: '+257', label: 'Burundi' },
  { code: '+855', label: 'Cambodia' },
  { code: '+237', label: 'Cameroon' },
  { code: '+238', label: 'Cape Verde' },
  { code: '+1-345', label: 'Cayman Islands' },
  { code: '+236', label: 'Central African Republic' },
  { code: '+235', label: 'Chad' },
  { code: '+56', label: 'Chile' },
  { code: '+86', label: 'China' },
  { code: '+57', label: 'Colombia' },
  { code: '+269', label: 'Comoros' },
  { code: '+242', label: 'Congo' },
  { code: '+243', label: 'Congo DR' },
  { code: '+682', label: 'Cook Islands' },
  { code: '+506', label: 'Costa Rica' },
  { code: '+385', label: 'Croatia' },
  { code: '+53', label: 'Cuba' },
  { code: '+599', label: 'Curacao' },
  { code: '+357', label: 'Cyprus' },
  { code: '+420', label: 'Czech Republic' },
  { code: '+253', label: 'Djibouti' },
  { code: '+1-767', label: 'Dominica' },
  { code: '+1-809', label: 'Dominican Republic' },
  { code: '+1-829', label: 'Dominican Republic' },
  { code: '+1-849', label: 'Dominican Republic' },
  { code: '+593', label: 'Ecuador' },
  { code: '+20', label: 'Egypt' },
  { code: '+503', label: 'El Salvador' },
  { code: '+240', label: 'Equatorial Guinea' },
  { code: '+291', label: 'Eritrea' },
  { code: '+372', label: 'Estonia' },
  { code: '+268', label: 'Eswatini' },
  { code: '+251', label: 'Ethiopia' },
  { code: '+500', label: 'Falkland Islands' },
  { code: '+298', label: 'Faroe Islands' },
  { code: '+679', label: 'Fiji' },
  { code: '+594', label: 'French Guiana' },
  { code: '+689', label: 'French Polynesia' },
  { code: '+241', label: 'Gabon' },
  { code: '+220', label: 'Gambia' },
  { code: '+995', label: 'Georgia' },
  { code: '+233', label: 'Ghana' },
  { code: '+350', label: 'Gibraltar' },
  { code: '+30', label: 'Greece' },
  { code: '+299', label: 'Greenland' },
  { code: '+1-473', label: 'Grenada' },
  { code: '+590', label: 'Guadeloupe' },
  { code: '+1-671', label: 'Guam' },
  { code: '+502', label: 'Guatemala' },
  { code: '+44-1481', label: 'Guernsey' },
  { code: '+224', label: 'Guinea' },
  { code: '+245', label: 'Guinea-Bissau' },
  { code: '+592', label: 'Guyana' },
  { code: '+509', label: 'Haiti' },
  { code: '+504', label: 'Honduras' },
  { code: '+852', label: 'Hong Kong' },
  { code: '+36', label: 'Hungary' },
  { code: '+354', label: 'Iceland' },
  { code: '+91', label: 'India' },
  { code: '+62', label: 'Indonesia' },
  { code: '+98', label: 'Iran' },
  { code: '+964', label: 'Iraq' },
  { code: '+44-1624', label: 'Isle of Man' },
  { code: '+972', label: 'Israel' },
  { code: '+225', label: 'Ivory Coast' },
  { code: '+1-876', label: 'Jamaica' },
  { code: '+81', label: 'Japan' },
  { code: '+44-1534', label: 'Jersey' },
  { code: '+962', label: 'Jordan' },
  { code: '+7', label: 'Kazakhstan' },
  { code: '+254', label: 'Kenya' },
  { code: '+686', label: 'Kiribati' },
  { code: '+383', label: 'Kosovo' },
  { code: '+965', label: 'Kuwait' },
  { code: '+996', label: 'Kyrgyzstan' },
  { code: '+856', label: 'Laos' },
  { code: '+371', label: 'Latvia' },
  { code: '+961', label: 'Lebanon' },
  { code: '+266', label: 'Lesotho' },
  { code: '+231', label: 'Liberia' },
  { code: '+218', label: 'Libya' },
  { code: '+423', label: 'Liechtenstein' },
  { code: '+370', label: 'Lithuania' },
  { code: '+352', label: 'Luxembourg' },
  { code: '+853', label: 'Macau' },
  { code: '+261', label: 'Madagascar' },
  { code: '+265', label: 'Malawi' },
  { code: '+60', label: 'Malaysia' },
  { code: '+960', label: 'Maldives' },
  { code: '+223', label: 'Mali' },
  { code: '+356', label: 'Malta' },
  { code: '+692', label: 'Marshall Islands' },
  { code: '+596', label: 'Martinique' },
  { code: '+222', label: 'Mauritania' },
  { code: '+230', label: 'Mauritius' },
  { code: '+262', label: 'Mayotte' },
  { code: '+52', label: 'Mexico' },
  { code: '+691', label: 'Micronesia' },
  { code: '+373', label: 'Moldova' },
  { code: '+377', label: 'Monaco' },
  { code: '+976', label: 'Mongolia' },
  { code: '+382', label: 'Montenegro' },
  { code: '+1-664', label: 'Montserrat' },
  { code: '+212', label: 'Morocco' },
  { code: '+258', label: 'Mozambique' },
  { code: '+95', label: 'Myanmar' },
  { code: '+264', label: 'Namibia' },
  { code: '+674', label: 'Nauru' },
  { code: '+977', label: 'Nepal' },
  { code: '+687', label: 'New Caledonia' },
  { code: '+64', label: 'New Zealand' },
  { code: '+505', label: 'Nicaragua' },
  { code: '+227', label: 'Niger' },
  { code: '+234', label: 'Nigeria' },
  { code: '+683', label: 'Niue' },
  { code: '+850', label: 'North Korea' },
  { code: '+389', label: 'North Macedonia' },
  { code: '+1-670', label: 'Northern Mariana Islands' },
  { code: '+968', label: 'Oman' },
  { code: '+92', label: 'Pakistan' },
  { code: '+680', label: 'Palau' },
  { code: '+970', label: 'Palestine' },
  { code: '+507', label: 'Panama' },
  { code: '+675', label: 'Papua New Guinea' },
  { code: '+595', label: 'Paraguay' },
  { code: '+51', label: 'Peru' },
  { code: '+63', label: 'Philippines' },
  { code: '+48', label: 'Poland' },
  { code: '+1-787', label: 'Puerto Rico' },
  { code: '+1-939', label: 'Puerto Rico' },
  { code: '+974', label: 'Qatar' },
  { code: '+262', label: 'Reunion' },
  { code: '+40', label: 'Romania' },
  { code: '+7', label: 'Russia' },
  { code: '+250', label: 'Rwanda' },
  { code: '+685', label: 'Samoa' },
  { code: '+378', label: 'San Marino' },
  { code: '+239', label: 'Sao Tome and Principe' },
  { code: '+966', label: 'Saudi Arabia' },
  { code: '+221', label: 'Senegal' },
  { code: '+381', label: 'Serbia' },
  { code: '+248', label: 'Seychelles' },
  { code: '+232', label: 'Sierra Leone' },
  { code: '+65', label: 'Singapore' },
  { code: '+1-721', label: 'Sint Maarten' },
  { code: '+421', label: 'Slovakia' },
  { code: '+386', label: 'Slovenia' },
  { code: '+677', label: 'Solomon Islands' },
  { code: '+252', label: 'Somalia' },
  { code: '+27', label: 'South Africa' },
  { code: '+82', label: 'South Korea' },
  { code: '+211', label: 'South Sudan' },
  { code: '+94', label: 'Sri Lanka' },
  { code: '+290', label: 'Saint Helena' },
  { code: '+1-869', label: 'Saint Kitts and Nevis' },
  { code: '+1-758', label: 'Saint Lucia' },
  { code: '+508', label: 'Saint Pierre and Miquelon' },
  { code: '+1-784', label: 'Saint Vincent and the Grenadines' },
  { code: '+249', label: 'Sudan' },
  { code: '+597', label: 'Suriname' },
  { code: '+963', label: 'Syria' },
  { code: '+886', label: 'Taiwan' },
  { code: '+992', label: 'Tajikistan' },
  { code: '+255', label: 'Tanzania' },
  { code: '+66', label: 'Thailand' },
  { code: '+670', label: 'Timor-Leste' },
  { code: '+228', label: 'Togo' },
  { code: '+690', label: 'Tokelau' },
  { code: '+676', label: 'Tonga' },
  { code: '+1-868', label: 'Trinidad and Tobago' },
  { code: '+216', label: 'Tunisia' },
  { code: '+90', label: 'Turkey' },
  { code: '+993', label: 'Turkmenistan' },
  { code: '+1-649', label: 'Turks and Caicos Islands' },
  { code: '+688', label: 'Tuvalu' },
  { code: '+256', label: 'Uganda' },
  { code: '+380', label: 'Ukraine' },
  { code: '+971', label: 'United Arab Emirates' },
  { code: '+598', label: 'Uruguay' },
  { code: '+998', label: 'Uzbekistan' },
  { code: '+678', label: 'Vanuatu' },
  { code: '+379', label: 'Vatican City' },
  { code: '+58', label: 'Venezuela' },
  { code: '+84', label: 'Vietnam' },
  { code: '+1-284', label: 'Virgin Islands, British' },
  { code: '+1-340', label: 'Virgin Islands, US' },
  { code: '+681', label: 'Wallis and Futuna' },
  { code: '+967', label: 'Yemen' },
  { code: '+260', label: 'Zambia' },
  { code: '+263', label: 'Zimbabwe' },
];

const phoneExamplesByDialCode: Record<string, string> = {
  '+1': '202 555 0145',
  '+1-242': '242 357 0000',
  '+1-246': '246 250 0000',
  '+1-264': '264 476 0000',
  '+1-268': '268 464 0000',
  '+1-284': '284 300 0000',
  '+1-340': '340 642 0000',
  '+1-345': '345 916 0000',
  '+1-441': '441 370 0000',
  '+1-473': '473 403 0000',
  '+1-649': '649 231 0000',
  '+1-664': '664 492 0000',
  '+1-670': '670 234 0000',
  '+1-671': '671 300 0000',
  '+1-721': '721 520 0000',
  '+1-758': '758 284 0000',
  '+1-767': '767 225 0000',
  '+1-784': '784 430 0000',
  '+1-787': '787 234 5678',
  '+1-809': '809 234 5678',
  '+1-829': '829 234 5678',
  '+1-849': '849 234 5678',
  '+1-868': '868 291 0000',
  '+1-869': '869 465 0000',
  '+1-876': '876 210 0000',
  '+1-939': '939 234 5678',
  '+7': '912 345 67 89',
  '+20': '100 123 4567',
  '+27': '71 123 4567',
  '+30': '691 234 5678',
  '+31': '6 12345678',
  '+32': '470 12 34 56',
  '+33': '6 12 34 56 78',
  '+34': '612 345 678',
  '+36': '20 123 4567',
  '+39': '312 345 6789',
  '+40': '712 345 678',
  '+41': '76 123 45 67',
  '+43': '664 123456',
  '+44': '7700 000000',
  '+44-1481': '7781 123456',
  '+44-1534': '7797 123456',
  '+44-1624': '7924 123456',
  '+45': '20 12 34 56',
  '+46': '70 123 45 67',
  '+47': '406 12 345',
  '+48': '512 345 678',
  '+49': '151 23456789',
  '+51': '912 345 678',
  '+52': '55 1234 5678',
  '+54': '9 11 2345 6789',
  '+55': '11 91234 5678',
  '+56': '9 6123 4567',
  '+57': '300 123 4567',
  '+58': '412 123 4567',
  '+60': '12 345 6789',
  '+61': '412 345 678',
  '+62': '812 3456 7890',
  '+63': '917 123 4567',
  '+64': '21 123 4567',
  '+65': '8123 4567',
  '+66': '81 234 5678',
  '+81': '90 1234 5678',
  '+82': '10 1234 5678',
  '+84': '91 234 56 78',
  '+86': '131 2345 6789',
  '+90': '532 123 4567',
  '+91': '98765 43210',
  '+92': '300 1234567',
  '+93': '70 123 4567',
  '+94': '71 234 5678',
  '+95': '9 123 456789',
  '+98': '912 345 6789',
  '+212': '612 345678',
  '+213': '551 23 45 67',
  '+216': '20 123 456',
  '+218': '91 234 5678',
  '+220': '301 2345',
  '+221': '77 123 45 67',
  '+222': '22 12 34 56',
  '+223': '76 12 34 56',
  '+224': '622 12 34 56',
  '+225': '01 23 45 67 89',
  '+226': '70 12 34 56',
  '+227': '93 12 34 56',
  '+228': '90 12 34 56',
  '+229': '90 12 34 56',
  '+230': '5251 2345',
  '+231': '77 012 3456',
  '+232': '76 123456',
  '+233': '24 123 4567',
  '+234': '803 123 4567',
  '+235': '63 12 34 56',
  '+236': '70 12 34 56',
  '+237': '6 71 23 45 67',
  '+238': '991 12 34',
  '+239': '981 2345',
  '+240': '222 123 456',
  '+241': '06 12 34 56',
  '+242': '06 123 4567',
  '+243': '81 234 5678',
  '+244': '923 123 456',
  '+245': '955 012 345',
  '+248': '2 510 123',
  '+249': '91 123 4567',
  '+250': '78 123 4567',
  '+251': '91 123 4567',
  '+252': '61 234 5678',
  '+253': '77 83 10 01',
  '+254': '712 345678',
  '+255': '712 345 678',
  '+256': '712 345678',
  '+257': '79 12 34 56',
  '+258': '82 123 4567',
  '+260': '95 1234567',
  '+261': '32 12 345 67',
  '+262': '692 12 34 56',
  '+263': '71 234 5678',
  '+264': '81 123 4567',
  '+265': '99 123 4567',
  '+266': '5012 3456',
  '+267': '71 123 456',
  '+268': '76 12 34 56',
  '+269': '321 23 45',
  '+290': '51234',
  '+297': '560 1234',
  '+298': '211234',
  '+299': '22 12 34',
  '+350': '54012345',
  '+351': '912 345 678',
  '+352': '621 123 456',
  '+353': '85 123 4567',
  '+354': '611 1234',
  '+355': '67 123 4567',
  '+356': '99 123 456',
  '+357': '96 123456',
  '+358': '40 123 4567',
  '+359': '88 123 4567',
  '+370': '612 34567',
  '+371': '21 234 567',
  '+372': '5123 4567',
  '+373': '69 123 456',
  '+374': '91 234567',
  '+375': '29 123 45 67',
  '+376': '312 345',
  '+377': '6 12 34 56 78',
  '+378': '66 66 12 12',
  '+379': '312 345 678',
  '+380': '67 123 4567',
  '+381': '60 1234567',
  '+382': '67 123 456',
  '+383': '43 123 456',
  '+385': '91 234 5678',
  '+386': '31 234 567',
  '+387': '61 123 456',
  '+389': '70 123 456',
  '+420': '601 123 456',
  '+421': '901 123 456',
  '+423': '660 123 456',
  '+500': '51234',
  '+501': '622 1234',
  '+502': '5123 4567',
  '+503': '7123 4567',
  '+504': '9123 4567',
  '+505': '8123 4567',
  '+506': '8312 3456',
  '+507': '6123 4567',
  '+508': '55 12 34',
  '+509': '34 10 1234',
  '+590': '690 12 34 56',
  '+591': '71234567',
  '+592': '609 1234',
  '+593': '99 123 4567',
  '+594': '694 20 12 34',
  '+595': '981 123456',
  '+596': '696 20 12 34',
  '+597': '741 2345',
  '+598': '91 234 567',
  '+599': '9 518 1234',
  '+670': '7721 2345',
  '+673': '712 3456',
  '+674': '555 1234',
  '+675': '7012 3456',
  '+676': '771 5123',
  '+677': '74 21234',
  '+678': '591 2345',
  '+679': '701 2345',
  '+680': '620 1234',
  '+681': '50 12 34',
  '+682': '71 234',
  '+683': '1234',
  '+685': '72 12345',
  '+686': '720 12345',
  '+687': '75 12 34',
  '+688': '901234',
  '+689': '87 12 34 56',
  '+690': '7290',
  '+691': '920 1234',
  '+692': '235 1234',
  '+852': '5123 4567',
  '+853': '6612 3456',
  '+855': '12 345 678',
  '+856': '20 23 123 456',
  '+880': '1712 345678',
  '+886': '912 345 678',
  '+960': '771 2345',
  '+961': '71 123 456',
  '+962': '79 123 4567',
  '+963': '944 567 890',
  '+964': '790 123 4567',
  '+965': '500 12345',
  '+966': '50 123 4567',
  '+967': '711 234 567',
  '+968': '9212 3456',
  '+970': '599 123 456',
  '+971': '50 123 4567',
  '+972': '50 123 4567',
  '+973': '3600 1234',
  '+974': '3312 3456',
  '+975': '17 123 456',
  '+976': '88 123456',
  '+977': '984 1234567',
  '+992': '92 123 4567',
  '+993': '65 123456',
  '+994': '50 123 4567',
  '+995': '555 12 34 56',
  '+996': '700 123 456',
  '+998': '90 123 45 67',
};

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(value.trim());
}

function normalizeLocalPhone(value: string): string {
  return value.replace(/[^\d]/g, '');
}

function isValidPhone(countryCode: string, localNumber: string): boolean {
  const digits = normalizeLocalPhone(localNumber);
  const countryDigits = countryCode.replace(/[^\d]/g, '');
  const totalLength = `${countryDigits}${digits}`.length;
  return /^\+[\d-]{1,8}$/.test(countryCode) && digits.length >= 6 && digits.length <= 14 && totalLength >= 8 && totalLength <= 15;
}

export default function BookingForm({ selectedEventId, priceOverrides }: BookingFormProps) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const router = useRouter();

  const [eventId, setEventId] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneCountryCode, setPhoneCountryCode] = useState('+44');
  const [phone, setPhone] = useState('');
  const [numParticipantsInput, setNumParticipantsInput] = useState('1');
  const [otherInfo, setOtherInfo] = useState('');
  const [acceptedLegal, setAcceptedLegal] = useState(false);
  const [confirmedEligibility, setConfirmedEligibility] = useState(false);
  const [attribution, setAttribution] = useState<{
    utm_source: string;
    utm_medium: string;
    utm_campaign: string;
    utm_content: string;
    utm_term: string;
    gclid: string;
  }>({
    utm_source: '',
    utm_medium: '',
    utm_campaign: '',
    utm_content: '',
    utm_term: '',
    gclid: '',
  });

  useEffect(() => {
    if (selectedEventId) {
      setEventId(String(selectedEventId));
    }
  }, [selectedEventId]);

  useEffect(() => {
    setConfirmedEligibility(false);
  }, [eventId]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const urlParams = new URLSearchParams(window.location.search);
    const fromQuery = {
      utm_source: urlParams.get('utm_source') || '',
      utm_medium: urlParams.get('utm_medium') || '',
      utm_campaign: urlParams.get('utm_campaign') || '',
      utm_content: urlParams.get('utm_content') || '',
      utm_term: urlParams.get('utm_term') || '',
      gclid: urlParams.get('gclid') || '',
    };

    const hasQueryAttribution = Object.values(fromQuery).some(Boolean);
    if (hasQueryAttribution) {
      setAttribution(fromQuery);
      window.sessionStorage.setItem('pt_attribution', JSON.stringify(fromQuery));
      return;
    }

    const stored = window.sessionStorage.getItem('pt_attribution');
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as Record<string, string>;
        setAttribution({
          utm_source: parsed.utm_source || '',
          utm_medium: parsed.utm_medium || '',
          utm_campaign: parsed.utm_campaign || '',
          utm_content: parsed.utm_content || '',
          utm_term: parsed.utm_term || '',
          gclid: parsed.gclid || '',
        });
      } catch {
        // no-op
      }
    }
  }, []);

  const selectedEvent = ALL_EVENTS.find(event => String(event.id) === eventId);
  const selectableEvents = FUTURE_EVENTS.filter(event => event.status !== 'Sold Out');
  const getDisplayPrice = (event: { id: number; price: string }) => priceOverrides?.[event.id] ?? event.price;
  const selectedEventPrice = selectedEvent ? getDisplayPrice(selectedEvent) : null;
  const selectedEventBasePriceGbp = selectedEventPrice
    ? Number(selectedEventPrice.replace(/[^0-9.]/g, ''))
    : null;
  const formatGbp = (value: number) => `£${Number.isInteger(value) ? value.toFixed(0) : value.toFixed(2)}`;
  const selectedEventOriginalPrice = selectedEvent
    ? (selectedEvent.originalPrice || (priceOverrides?.[selectedEvent.id] && priceOverrides[selectedEvent.id] !== selectedEvent.price ? selectedEvent.price : null))
    : null;
  const selectedEventOriginalBasePriceGbp = selectedEventOriginalPrice
    ? Number(selectedEventOriginalPrice.replace(/[^0-9.]/g, ''))
    : null;
  const requiresEligibilityConfirmation = Boolean(selectedEvent?.eligibilityNote);
  const phoneExample = phoneExamplesByDialCode[phoneCountryCode] || '612 345 678';
  const getNormalizedParticipants = () => {
    const parsed = parseInt(numParticipantsInput, 10);
    if (!Number.isFinite(parsed)) return 1;
    return Math.max(1, Math.min(16, parsed));
  };

  const resetForm = () => {
    setFullName('');
    setEmail('');
    setPhoneCountryCode('+44');
    setPhone('');
    setNumParticipantsInput('1');
    setOtherInfo('');
    setAcceptedLegal(false);
    setConfirmedEligibility(false);

    if (!selectedEventId) {
      setEventId('');
    } else {
      setEventId(String(selectedEventId));
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    try {
      const cleanEmail = email.trim();
      const cleanPhoneDigits = normalizeLocalPhone(phone);
      const normalizedPhone = `${phoneCountryCode} ${cleanPhoneDigits}`;

      if (!isValidEmail(cleanEmail)) {
        throw new Error('Please enter a valid email address.');
      }

      if (!isValidPhone(phoneCountryCode, phone)) {
        throw new Error('Please enter a valid phone number with country code.');
      }

      const payload = {
        event_id: Number(eventId),
        event_name: selectedEvent ? `${selectedEvent.date} - From ${getDisplayPrice(selectedEvent)}` : undefined,
        full_name: fullName.trim(),
        email: cleanEmail,
        phone: normalizedPhone,
        num_participants: getNormalizedParticipants(),
        special_requests: otherInfo.trim(),
        accepted_privacy_terms: acceptedLegal,
        eligibility_confirmed: requiresEligibilityConfirmation ? confirmedEligibility : undefined,
        ...attribution,
      };

      const response = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = (await response.json()) as BookingResponse;
      if (!response.ok || !data.ok) {
        throw new Error(data.error || 'Submission failed.');
      }

      const eventLabel = selectedEvent ? selectedEvent.date : '';
      const query = new URLSearchParams();
      if (eventLabel) query.set('event', eventLabel);
      if (data.quotation_id) query.set('qid', String(data.quotation_id));
      const queryString = query.toString();
      const destination = queryString ? `/booking-submitted?${queryString}` : '/booking-submitted';

      resetForm();
      router.push(destination);
    } catch (error) {
      setStatus('error');
      setErrorMsg(error instanceof Error ? error.message : 'Something went wrong. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 md:space-y-7 pb-2 md:pb-4">
      <div>
        <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-red mb-5">Enquiry Request</p>
        <div className="mb-5 rounded-xl border border-stone-200 bg-stone-50/80 px-4 py-3">
          {selectedEvent ? (
            <div className="text-xs text-stone-600 leading-relaxed space-y-1">
              <p>
                {selectedEventOriginalPrice && (
                  <span className="line-through text-stone-400 mr-1">{toDualCurrencyDisplay(selectedEventOriginalPrice)}</span>
                )}
                <span className="font-semibold text-brand-dark">
                  {selectedEventBasePriceGbp && Number.isFinite(selectedEventBasePriceGbp)
                    ? `${formatGbp(selectedEventBasePriceGbp)} per person based on 2 sharing`
                    : `${selectedEventPrice} per person based on 2 sharing`}
                </span>
              </p>
              <p>
                {selectedEventOriginalBasePriceGbp && Number.isFinite(selectedEventOriginalBasePriceGbp) && (
                  <span className="line-through text-stone-400 mr-1">
                    {toDualCurrencyDisplay(formatGbp(selectedEventOriginalBasePriceGbp + 200))}
                  </span>
                )}
                <span className="font-semibold text-brand-dark">
                  {selectedEventBasePriceGbp && Number.isFinite(selectedEventBasePriceGbp)
                    ? formatGbp(selectedEventBasePriceGbp + 200)
                    : '£845'}
                </span>{' '}
                <span className="text-stone-600">Have a whole room to yourself</span>
              </p>
            </div>
          ) : (
            <p className="text-xs text-stone-600 leading-relaxed">
              Select a date to see the exact price for that event.
            </p>
          )}
        </div>
        <div className="grid md:grid-cols-2 gap-5">
          <div className="md:col-span-2">
            <label className={labelClass}>Select Date *</label>
            <div className="relative">
              <select
                required
                value={eventId}
                onChange={e => setEventId(e.target.value)}
                className={`${inputClass} appearance-none pr-10`}
              >
                <option value="">Choose a date...</option>
                {selectableEvents.map(event => (
                  <option key={event.id} value={event.id}>
                    {event.date}
                  </option>
                ))}
              </select>
              <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none" />
            </div>
            <Link
              href="/events#full-itinerary"
              className="mt-2 inline-flex text-xs font-semibold text-brand-red underline decoration-brand-red/35 underline-offset-4 hover:text-brand-dark transition-colors"
            >
              View the full 4-day itinerary
            </Link>
          </div>

          <div>
            <label className={labelClass}>Full Name *</label>
            <input
              required
              type="text"
              placeholder="Your full name"
              value={fullName}
              onChange={e => setFullName(e.target.value)}
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Email Address *</label>
            <input
              required
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder="email@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              pattern="^[^\s@]+@[^\s@]+\.[^\s@]{2,}$"
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Phone Number *</label>
            <div className="grid grid-cols-[minmax(136px,0.9fr)_1fr] gap-2">
              <div className="relative">
                <select
                  required
                  value={phoneCountryCode}
                  onChange={e => setPhoneCountryCode(e.target.value)}
                  className={`${inputClass} appearance-none pr-8`}
                  aria-label="Country calling code"
                >
                  {countryDialCodes.map(country => (
                    <option key={`${country.label}-${country.code}`} value={country.code}>
                      {country.label} {country.code}
                    </option>
                  ))}
                </select>
                <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none" />
              </div>
              <input
                required
                type="tel"
                inputMode="tel"
                autoComplete="tel-national"
                placeholder={phoneExample}
                value={phone}
                onChange={e => setPhone(e.target.value)}
                pattern="[0-9 ()-]{6,18}"
                minLength={6}
                maxLength={18}
                className={inputClass}
              />
            </div>
            <p className="mt-2 text-xs text-stone-400">
              Include your mobile number without the country prefix. Example: {phoneExample}
            </p>
          </div>

          <div className="md:col-span-2 md:max-w-[220px]">
            <label className={labelClass}>How Many Players *</label>
            <input
              required
              type="number"
              min={1}
              max={16}
              value={numParticipantsInput}
              onFocus={e => e.currentTarget.select()}
              onChange={e => setNumParticipantsInput(e.target.value)}
              onBlur={() => setNumParticipantsInput(String(getNormalizedParticipants()))}
              className={inputClass}
            />
          </div>

          <div className="md:col-span-2">
            <label className={labelClass}>Any Other Information</label>
            <textarea
              rows={5}
              placeholder="Anything else we should know?"
              value={otherInfo}
              onChange={e => setOtherInfo(e.target.value)}
              className={`${inputClass} resize-none`}
            />
          </div>
        </div>
      </div>

      {status === 'error' && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-3">{errorMsg}</p>
      )}

      {requiresEligibilityConfirmation && (
        <div className="rounded-xl border border-amber-200 bg-amber-50/70 p-4">
          <label className="flex items-start gap-3 text-sm text-amber-900">
            <input
              required
              type="checkbox"
              checked={confirmedEligibility}
              onChange={e => setConfirmedEligibility(e.target.checked)}
              className="mt-0.5 h-4 w-4 rounded border-amber-300 text-brand-red focus:ring-brand-red"
            />
            <span>
              I confirm I meet the required level for this event: <strong>{selectedEvent?.eligibilityNote}</strong>.
            </span>
          </label>
        </div>
      )}

      <div className="rounded-xl border border-stone-200 bg-stone-50/70 p-4">
        <label className="flex items-start gap-3 text-sm text-stone-600">
          <input
            required
            type="checkbox"
            checked={acceptedLegal}
            onChange={e => setAcceptedLegal(e.target.checked)}
            className="mt-0.5 h-4 w-4 rounded border-stone-300 text-brand-red focus:ring-brand-red"
          />
          <span>
            I accept the{' '}
            <Link href="/privacy-policy" className="text-brand-red underline hover:text-brand-dark">
              Privacy Policy
            </Link>{' '}
            and{' '}
            <Link href="/terms-and-conditions" className="text-brand-red underline hover:text-brand-dark">
              Terms & Conditions
            </Link>
            .
          </span>
        </label>
      </div>

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full py-4 rounded-full bg-brand-red text-white font-semibold uppercase tracking-[0.15em] hover:bg-brand-dark disabled:opacity-60 disabled:cursor-not-allowed transition-colors shadow-sm"
      >
        {status === 'loading' ? 'Submitting...' : 'Submit Enquiry Request'}
      </button>
      <p className="text-center text-stone-400 text-sm">We&apos;ll confirm your quotation by email within 24 hours.</p>
    </form>
  );
}
