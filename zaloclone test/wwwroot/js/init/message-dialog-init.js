function initMessageDialog() {
    const textarea = document.querySelector('.aside-chat-input_text');
    const sendButton = document.querySelector('.aside-chat-bar-btn_send');
    const emojiBtn = document.querySelector('.emoji-btn');
    const emojiPicker = document.querySelector('.emoji-picker');
    const emojiList = document.querySelectorAll('.emoji-list span');

    if (textarea && sendButton) {
        // Điều chỉnh chiều cao của textarea dựa trên nội dung
        textarea.addEventListener('input', function() {
            this.style.height = '28px'; // Reset chiều cao để tính toán lại
            this.style.height = Math.min(this.scrollHeight, 140) + 'px'; // Điều chỉnh chiều cao dựa trên nội dung nhưng không vượt quá 140px

            if (this.value.trim().length > 0) {
                sendButton.classList.add('visible'); // Hiển thị nút gửi nếu có nội dung
            } else {
                sendButton.classList.remove('visible'); // Ẩn nút gửi nếu không có nội dung
            }
        });

        // Sự kiện nhấn phím Enter để gửi tin nhắn
        textarea.addEventListener('keydown', function(event) {
            if (event.key === 'Enter') {
                event.preventDefault(); // Ngăn không cho xuống dòng
                sendButton.click(); // Giả lập click nút gửi

                // Tùy chọn: Xóa nội dung sau khi gửi tin nhắn
                textarea.value = '';
                textarea.style.height = '28px'; // Reset chiều cao sau khi gửi
                sendButton.classList.remove('visible');
            }
        });

        sendButton.addEventListener('click', function() {
            const messageText = textarea.value.trim();

            if (messageText.length > 0) {
                // Tạo và thêm tin nhắn mới vào giao diện
                addMessageToChat(messageText);

                // Xóa nội dung sau khi gửi tin nhắn
                textarea.value = '';
                textarea.style.height = '28px'; // Reset chiều cao sau khi gửi
                sendButton.classList.remove('visible');
            }
        });

    } else {
        console.error('Textarea hoặc Send button không tìm thấy!');
    }

    // Hiển thị hoặc ẩn danh sách emoji khi click vào nút emoji
    if (emojiBtn && emojiPicker) {
        emojiBtn.addEventListener('click', function() {
            emojiPicker.style.display = emojiPicker.style.display === 'block' ? 'none' : 'block';
        });

        // Chọn emoji và thêm vào textarea
        emojiList.forEach(function(emoji) {
            emoji.addEventListener('click', function() {
                textarea.value += emoji.textContent; // Thêm emoji vào ô input
                emojiPicker.style.display = 'none';  // Ẩn emoji picker sau khi chọn
                if (textarea.value.trim().length > 0) {
                    sendButton.classList.add('visible'); // Hiển thị nút gửi
                }
                textarea.focus();  // Đưa con trỏ vào ô input
            });
        });
    } else {
        console.error('Emoji button hoặc Emoji picker không tìm thấy!');
    }
}

// Export the function if using modules, or attach it to the global object if not
if (typeof module !== 'undefined' && module.exports) {
    module.exports = initMessageDialog;
} else {
    window.initMessageDialog = initMessageDialog;
}
