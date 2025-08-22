document.addEventListener('DOMContentLoaded', function () {
  const demoElementAc = document.getElementById('demo-location-wavebear')
  if (demoElementAc) {
    demoElementAc.hidden = true
    function renderLocation({ query = null, type = null, parentId = null, selectElement = null }) {
      let urlApi = `https://wavebear.com.vn/api/location-viet-nam/${type}?q=${query}`;
      if (parentId){
        parentId = parentId === 'all' ? 0 : parentId;
        urlApi = `https://wavebear.com.vn/api/location-viet-nam/${type}/${parentId}?q=${query}`;
      }
      fetch(urlApi)
        .then(response => {
          if (!response.ok) {
            toast({
              title: "Thất bại!",
              message: "Có lỗi xảy ra, vui lòng liên hệ quản trị viên.",
              type: "warning",
              duration: 2000,
            });
            throw new Error('Network response was not ok');
          }
          toast({
            title: "Thành công!",
            message: "Gọi API thành công.",
            type: "success",
            duration: 2000,
          });
          return response.json();
        })
        .then(data => {
          if (selectElement.children.length >= 1) {
            selectElement.innerHTML = '';
          }
          for (const key in data) {
            const option = document.createElement('option');
            option.value = data[key].code;
            option.textContent = data[key].name;
            selectElement.appendChild(option);
          }
        })
        .catch(error => {
          console.error(error);
        });
    }

    // Tạo select

    // Select tỉnh
    const selectProvider = document.createElement('select');
    selectProvider.className = 'form-select';

    // Option mặc định cho Tỉnh
    const optionDefaultProvider = document.createElement('option');
    optionDefaultProvider.textContent = 'Chọn tỉnh';
    optionDefaultProvider.selected = true;
    selectProvider.appendChild(optionDefaultProvider);

    // Select xã/phường
    const selectWard = document.createElement('select');
    selectWard.className = 'form-select';

    // Option mặc định cho Xã/Phường
    const optionDefaultWard = document.createElement('option');
    optionDefaultWard.textContent = 'Chọn xã/phường';
    optionDefaultWard.selected = true;
    selectWard.appendChild(optionDefaultWard);

    // Container chứa 2 select
    const containerBox = document.createElement('div');
    containerBox.style.display = 'flex';
    containerBox.style.margin = '30px';
    containerBox.style.gap = '10px'; // cách ra một chút

    // Thêm container vào sau #demo
    demoElementAc.insertAdjacentElement('afterend', containerBox);

    // Append select vào container
    selectWard.style.width = '50%';
    selectProvider.style.width = '50%';

    containerBox.append(selectProvider, selectWard);

    renderLocation({ type: 'provider', selectElement: selectProvider });

    selectProvider.oninput = (e) => {
      const providerId = e.target.value;
      renderLocation({ type: 'ward', parentId: providerId, selectElement: selectWard });
    };
  }
});
