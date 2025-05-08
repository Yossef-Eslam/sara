document.addEventListener('DOMContentLoaded', function() {
    // يمكنك إضافة التفاعلات هنا لاحقاً
    console.log('تم تحميل الموقع بنجاح');
    
    // مثال: إضافة تاريخ الحد الأدنى لحجز الموعد
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('date')?.setAttribute('min', today);
});
