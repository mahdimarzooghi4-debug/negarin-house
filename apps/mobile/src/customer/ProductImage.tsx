import { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { apiJson } from "../api/client";
import { parseProductImageRead } from "../domain/product-media";
import type { Product } from "./catalog";
export function ProductImage({ product, hero = false, compact = false }: { product: Pick<Product, "id" | "title" | "coverImageId">; hero?: boolean; compact?: boolean }) {
  const [url, setUrl] = useState<string | null>(null);
  useEffect(() => {
    const controller = new AbortController(); let timer: ReturnType<typeof setTimeout> | undefined;
    setUrl(null);
    if (product.coverImageId) {
      void apiJson(`/api/v1/catalog/products/${product.id}/images/${product.coverImageId}`, null, { signal: controller.signal })
        .then(body => {
          const read = parseProductImageRead(body, product.coverImageId!, __DEV__);
          if (!read || controller.signal.aborted) return;
          setUrl(read.url);
          timer = setTimeout(() => setUrl(null), read.expiresInSeconds * 1000);
        }).catch(() => {});
    }
    return () => { controller.abort(); if (timer) clearTimeout(timer); };
  }, [product.id, product.coverImageId]);
  return <View style={hero ? styles.hero : [styles.imageBox, compact && styles.compact]}>
    {url ? <Image source={{ uri: url }} accessibilityLabel={product.title} resizeMode={hero ? "cover" : "contain"} style={styles.image} onError={() => setUrl(null)} /> : <Text style={styles.imageFallback}>تصویر در دسترس نیست</Text>}
  </View>;
}

const styles = StyleSheet.create({ hero: { width: "100%", aspectRatio: 358 / 322, borderRadius: 20, overflow: "hidden", backgroundColor: "#f4f6f8", justifyContent: "center" }, compact: { width: 104, height: 132 }, imageBox: { width: 114, height: 130, borderRadius: 14, overflow: "hidden", justifyContent: "center", backgroundColor: "#f4f6f8" }, image: { width: "100%", height: "100%" }, imageFallback: { fontFamily: "Vazirmatn", fontSize: 11, color: "#6d7892", textAlign: "center", padding: 8 } });
