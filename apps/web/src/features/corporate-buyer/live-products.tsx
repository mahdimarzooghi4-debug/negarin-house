"use client";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {useEffect,useMemo,useState} from "react";
import {CorporateLiveShell} from "./live-shell";
import {CorporateSessionGate} from "./live-session";
import {CORPORATE_LIST_PAGE_SIZE,MAX_CORPORATE_LIST_PAGE,MAX_PURCHASE_REQUEST_LINES,formatToman,isUuid,parseCorporateProduct,parseProductPage,type CorporateProduct} from "./live-data";
import styles from "./live.module.css";

function ProductImage({product}:{product:CorporateProduct}){
  const [url,setUrl]=useState<string|null>(null);
  useEffect(()=>{
    if(!product.coverImageId){setUrl(null);return;}
    const controller=new AbortController();
    void fetch(`/api/corporate/products/${product.id}/images/${product.coverImageId}`,{cache:"no-store",signal:controller.signal})
      .then(async response=>response.ok?response.json():null)
      .then(body=>{if(body&&typeof body.url==="string")setUrl(body.url);})
      .catch(()=>{});
    return ()=>controller.abort();
  },[product.id,product.coverImageId]);
  return <div className={styles.cardImage}>{url?<img src={url} alt=""/>:<span>بدون تصویر</span>}</div>;
}

function ErrorBox({message}:{message:string}){return <div className={styles.error}>{message}</div>;}

export function CorporateProductsLive(){
  const router=useRouter();
  const [page,setPage]=useState(1);
  const [query,setQuery]=useState("");
  const [stock,setStock]=useState<"all"|"true"|"false">("all");
  const [data,setData]=useState<ReturnType<typeof parseProductPage>>(null);
  const [loading,setLoading]=useState(true);
  const [error,setError]=useState("");
  const [selectionError,setSelectionError]=useState("");
  const [selected,setSelected]=useState<Record<string,boolean>>({});

  useEffect(()=>{
    const controller=new AbortController();setLoading(true);setError("");
    const params=new URLSearchParams({page:String(page),pageSize:String(CORPORATE_LIST_PAGE_SIZE),sort:"newest"});
    if(query.trim())params.set("q",query.trim());
    if(stock!=="all")params.set("inStock",stock);
    void fetch("/api/corporate/products?"+params.toString(),{cache:"no-store",signal:controller.signal})
      .then(async response=>{
        if(response.status===401)throw new Error("نشست شما منقضی شده است.");
        if(!response.ok)throw new Error("فهرست محصولات دریافت نشد.");
        const parsed=parseProductPage(await response.json(),{page,pageSize:CORPORATE_LIST_PAGE_SIZE});
        if(!parsed)throw new Error("پاسخ محصولات با قرارداد نگارین سازگار نیست.");
        setData(parsed);
      }).catch(error=>{if(!controller.signal.aborted)setError(error instanceof Error?error.message:"خطای نامشخص");})
      .finally(()=>{if(!controller.signal.aborted)setLoading(false);});
    return ()=>controller.abort();
  },[page,query,stock]);

  const ids=useMemo(()=>Object.keys(selected).filter(id=>selected[id]),[selected]);
  return <CorporateSessionGate><CorporateLiveShell title="محصولات سازمانی">
    <section className={styles.panel}>
      <div className={styles.toolbar}>
        <input aria-label="جستجوی محصولات" value={query} onChange={event=>{setPage(1);setQuery(event.target.value)}} placeholder="جستجو در عنوان یا توضیحات"/>
        <select aria-label="وضعیت موجودی" value={stock} onChange={event=>{setPage(1);setStock(event.target.value as typeof stock)}}>
          <option value="all">همهٔ موجودی‌ها</option><option value="true">موجود</option><option value="false">ناموجود</option>
        </select>
        <button className={styles.button} type="button" disabled={!ids.length} onClick={()=>router.push("/corporate-buyer/new-purchase-request?products="+encodeURIComponent(ids.join(",")))}>
          ساخت درخواست از انتخاب‌ها ({ids.length}/{MAX_PURCHASE_REQUEST_LINES})
        </button>
      </div>
      {loading&&<div className={styles.empty}>در حال دریافت محصولات واقعی…</div>}
      {error&&<ErrorBox message={error}/>}
      {selectionError&&<ErrorBox message={selectionError}/>}
      {!loading&&!error&&data&&data.items.length===0&&<div className={styles.empty}>محصول منتشرشده‌ای با این فیلتر پیدا نشد.</div>}
      {!loading&&!error&&data&&<div className={styles.grid}>{data.items.map(product=><article className={styles.card} key={product.id}>
        <ProductImage product={product}/>
        <div className={styles.cardBody}>
          <div className={styles.cardMeta}><span>{product.category}</span><span>{product.availability==="in_stock"?"موجود":"ناموجود"}</span></div>
          <h2>{product.title}</h2>
          <p className={styles.price}>{formatToman(product.priceToman)}</p>
          <label className={styles.selection}><input type="checkbox" checked={!!selected[product.id]} onChange={event=>{
            const checked=event.target.checked;
            if(checked&&!selected[product.id]&&ids.length>=MAX_PURCHASE_REQUEST_LINES){setSelectionError(`حداکثر ${MAX_PURCHASE_REQUEST_LINES} محصول در هر PurchaseRequest قابل انتخاب است.`);return;}
            setSelectionError("");setSelected(previous=>({...previous,[product.id]:checked}));
          }}/> انتخاب برای درخواست</label>
          <div className={styles.cardActions}>
            <Link className={styles.secondary} href={"/corporate-buyer/product-detail?id="+product.id}>مشاهده جزئیات</Link>
            <Link className={styles.button} href={"/corporate-buyer/new-purchase-request?products="+product.id}>افزودن به درخواست</Link>
          </div>
        </div>
      </article>)}</div>}
      {data&&<div className={styles.pagination}>
        <button className={styles.secondary} type="button" disabled={page<=1} onClick={()=>setPage(value=>Math.max(1,value-1))}>قبلی</button>
        <span>صفحه {new Intl.NumberFormat("fa-IR").format(page)}</span>
        <button className={styles.secondary} type="button" disabled={!data.hasMore||page>=MAX_CORPORATE_LIST_PAGE} onClick={()=>setPage(value=>Math.min(MAX_CORPORATE_LIST_PAGE,value+1))}>بعدی</button>
      </div>}
    </section>
  </CorporateLiveShell></CorporateSessionGate>;
}

export function CorporateProductDetailLive({id}:{id:string}){
  const [product,setProduct]=useState<CorporateProduct|null>(null),[error,setError]=useState(""),[loading,setLoading]=useState(true);
  useEffect(()=>{
    if(!isUuid(id)){setError("شناسه محصول معتبر نیست.");setLoading(false);return;}
    const controller=new AbortController();
    void fetch("/api/corporate/products/"+id,{cache:"no-store",signal:controller.signal}).then(async response=>{
      if(response.status===404)throw new Error("محصول منتشرشده پیدا نشد.");
      if(!response.ok)throw new Error("جزئیات محصول دریافت نشد.");
      const parsed=parseCorporateProduct(await response.json());if(!parsed)throw new Error("پاسخ محصول معتبر نیست.");setProduct(parsed);
    }).catch(error=>{if(!controller.signal.aborted)setError(error instanceof Error?error.message:"خطا");})
      .finally(()=>{if(!controller.signal.aborted)setLoading(false);});
    return ()=>controller.abort();
  },[id]);

  return <CorporateSessionGate><CorporateLiveShell title="جزئیات محصول"><section className={styles.panel}>
    {loading&&<div className={styles.empty}>در حال دریافت محصول…</div>}{error&&<ErrorBox message={error}/>}
    {product&&<><div className={styles.detailGrid}>
      <div>
        <ProductImage product={product}/>
        <div className={styles.cardActions}><Link className={styles.button} href={"/corporate-buyer/new-purchase-request?products="+product.id}>افزودن به درخواست خرید</Link><Link className={styles.secondary} href="/corporate-buyer/corporate-products">بازگشت به محصولات</Link></div>
      </div>
      <div>
        <h2>{product.title}</h2>
        <p>{product.description}</p>
        <div className={styles.kv}><small>دسته‌بندی</small>{product.category}</div>
        <div className={styles.kv}><small>قیمت فعلی هنرمند</small>{formatToman(product.priceToman)}</div>
        <div className={styles.kv}><small>وضعیت موجودی</small>{product.availability==="in_stock"?"موجود":"ناموجود"}</div>
        <div className={styles.kv}><small>مواد اولیه</small>{product.materials??"—"}</div>
        <div className={styles.kv}><small>ابعاد</small>{product.dimensions??"—"}</div>
        <div className={styles.kv}><small>تکنیک</small>{product.technique??"—"}</div>
        <p className={styles.notice}>این قیمت صرفاً قیمت جاریِ Artist است و داخل PurchaseRequest به‌عنوان قیمت تجاری یا توافقی ذخیره نمی‌شود.</p>
      </div>
    </div></>}
  </section></CorporateLiveShell></CorporateSessionGate>;
}
