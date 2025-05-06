import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Footer as FooterElement } from '@/components/elements/Footer';
import Icon from '@../../public/icon.png';

export const Footer = () => {
  return (
    <footer id="contact" className="border-t">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Logo dan Deskripsi */}
          <div>
            <Image
              src={Icon}
              alt="Gizi Snap Logo"
              className="mb-4 h-10 w-auto"
            />
            <p className="">
              GiziSnap: Memberdayakan kesehatan melalui gizi cerdas berbasis
              kuliner Indonesia.
            </p>
          </div>

          {/* Tautan Cepat */}
          <div>
            <h4 className="mb-4 font-semibold">Navigasi</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-green-600">
                  Beranda
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-green-600">
                  Fitur
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-green-600">
                  Tentang Kami
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-green-600">
                  Kontak
                </a>
              </li>
            </ul>
          </div>

          {/* Layanan */}
          <div>
            <h4 className="mb-4 font-semibold">Layanan</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-green-600">
                  Pindai Makanan
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-green-600">
                  Rekomendasi Gizi
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-green-600">
                  Riwayat Kesehatan
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-green-600">
                  Profil Pengguna
                </a>
              </li>
            </ul>
          </div>

          {/* Sosial Media */}
          <div>
            <h4 className="mb-4 font-semibold">Ikuti Kami</h4>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-green-600">
                <Facebook size={24} />
              </a>
              <a href="#" className="hover:text-green-600">
                <Instagram size={24} />
              </a>
              <a href="#" className="hover:text-green-600">
                <Twitter size={24} />
              </a>
              <a href="#" className="hover:text-green-600">
                <Linkedin size={24} />
              </a>
            </div>

            <div className="mt-6">
              <h4 className="mb-2 font-semibold">Newsletter</h4>
              <div className="flex">
                <Input
                  type="email"
                  placeholder="Email Anda"
                  className="w-full rounded-r-none focus:ring-2 focus:ring-green-500"
                />
                <Button className="rounded-l-none bg-green-500 text-white hover:bg-green-600">
                  Kirim
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <FooterElement className="mt-12" />
      </div>
    </footer>
  );
};
