$( function() {
    $( document ).on( 'click', '#change_email_modal .action-button', function () {
        if ( $( '#change_email_form' ).parsley().validate() ) {
            var target = $( this );
            var form_data = new FormData();
            form_data.append( 'email', $( '#change_email_form [name=email]' ).val() );
            form_data.append( 'password', $( '#change_email_form [name=password]' ).val() );
            $.ajax({
                'data': form_data,
                'url': $( '#change_email_check_form' ).val(),
                'type': 'POST',
                'dataType': 'json',
                'processData': false,
                'contentType': false,
            }).done( function( response ){
                if ( response.check ) {
                    $( '#change_email_modal .error-message-area' ).addClass( 'd-none' );
                    $( '#change_email_modal .error-message-area .error-message' ).text( '' );
                    $( target ).next().trigger( 'click' );
                    up_modal();
                } else {
                    $( '#change_email_modal .error-message-area' ).removeClass( 'd-none' );
                    $( '#change_email_modal .error-message-area .error-message' ).text( response.message );
                }
            }).fail( function(){
                $( '#change_email_modal .error-message-area' ).removeClass( 'd-none' );
                $( '#change_email_modal .error-message-area .error-message' ).text( 'メールアドレスの変更に失敗しました' );
            });
        }
    });
    $( document ).on( 'click', '#change_email_check_modal .yes-button', function () {
        var target = $( this );
        var form_data = new FormData();
        form_data.append( 'email', $( '#change_email_form [name=email]' ).val() );
        form_data.append( 'password', $( '#change_email_form [name=password]' ).val() );
        $.ajax({
            'data': form_data,
            'url': $( '#change_email_form' ).attr( 'action' ),
            'type': 'POST',
            'dataType': 'json',
            'processData': false,
            'contentType': false,
        }).done( function( response ){
            $( '#change_email_check_modal .no-button' ).trigger( 'click' );
            $( target ).next().trigger( 'click' );
            up_modal();
        }).fail( function(){
            $( '#change_email_check_modal .no-button' ).trigger( 'click' );
            $( target ).next().next().trigger( 'click' );
            up_modal();
        });
    });
    modal_reload( 'change_email' );

    $( document ).on( 'click', '#change_password_modal .action-button', function () {
        if ( $( '#change_password_form' ).parsley().validate() ) {
            var target = $( this );
            var form_data = new FormData();
            form_data.append( 'now_password', $( '#change_password_form [name=now_password]' ).val() );
            $.ajax({
                'data': form_data,
                'url': $( '#change_password_check_form' ).val(),
                'type': 'POST',
                'dataType': 'json',
                'processData': false,
                'contentType': false,
            }).done( function( response ){
                if ( response.check ) {
                    $( '#change_password_modal .error-message-area' ).addClass( 'd-none' );
                    $( '#change_password_modal .error-message-area .error-message' ).text( '' );
                    $( target ).next().trigger( 'click' );
                    up_modal();
                } else {
                    $( '#change_password_modal .error-message-area' ).removeClass( 'd-none' );
                    $( '#change_password_modal .error-message-area .error-message' ).text( 'パスワードが間違っています' );
                }
            }).fail( function(){
                $( '#change_password_modal .error-message-area' ).removeClass( 'd-none' );
                $( '#change_password_modal .error-message-area .error-message' ).text( 'パスワードの変更に失敗しました' );
            });
        }
    });
    $( document ).on( 'click', '#change_password_check_modal .yes-button', function () {
        var target = $( this );
        var form_data = new FormData();
        form_data.append( 'new_password', $( '#change_password_form [name=new_password]' ).val() );
        $.ajax({
            'data': form_data,
            'url': $( '#change_password_form' ).attr( 'action' ),
            'type': 'POST',
            'dataType': 'json',
            'processData': false,
            'contentType': false,
        }).done( function( response ){
            $( '#change_password_check_modal .no-button' ).trigger( 'click' );
            $( target ).next().trigger( 'click' );
            up_modal();
        }).fail( function(){
            $( '#change_password_check_modal .no-button' ).trigger( 'click' );
            $( target ).next().next().trigger( 'click' );
            up_modal();
        });
    });
    modal_reload( 'change_password' );

    $( document ).on( 'click', '#add_manager_modal .action-button', function () {
        if ( $( '#add_manager_form' ).parsley().validate() ) {
            var target = $( this );
            var form_data = new FormData();
            form_data.append( 'email', $( '#add_manager_form [name=email]' ).val() );
            $.ajax({
                'data': form_data,
                'url': $( '#add_manager_check_form' ).val(),
                'type': 'POST',
                'dataType': 'json',
                'processData': false,
                'contentType': false,
            }).done( function( response ){
                if ( response.check ) {
                    $( '#add_check_modal .modal-description-area' ).removeClass( 'd-none' );
                    $( '#add_check_modal .modal-description-area .description' ).text( 'メールアドレス宛にログイン情報を記載したメールを送信します' );
                    $( '#add_manager_modal .error-message-area' ).addClass( 'd-none' );
                    $( '#add_manager_modal .error-message-area .error-message' ).text( '' );
                    $( '#add_check_modal .yes-button' ).val( $( target ).val() );
                    $( target ).next().trigger( 'click' );
                    up_modal();
                } else {
                    $( '#add_check_modal .modal-description-area' ).addClass( 'd-none' );
                    $( '#add_check_modal .modal-description-area .description' ).text( '' );
                    $( '#add_manager_modal .error-message-area' ).removeClass( 'd-none' );
                    $( '#add_manager_modal .error-message-area .error-message' ).text( response.message );
                }
            }).fail( function(){
                $( '#add_check_modal .modal-description-area' ).addClass( 'd-none' );
                $( '#add_check_modal .modal-description-area .description' ).text( '' );
                $( '#add_manager_modal .error-message-area' ).removeClass( 'd-none' );
                $( '#add_manager_modal .error-message-area .error-message' ).text( '管理者の追加に失敗しました' );
            });
        }
    });
    $( document ).on( 'click', '#add_check_modal .yes-button', function () {
        if ( $( this ).val() == 'manager' ) {
            var target = $( this );
            var form_data = new FormData();
            form_data.append( 'email', $( '#add_manager_form [name=email]' ).val() );
            $.ajax({
                'data': form_data,
                'url': $( '#add_manager_form' ).attr( 'action' ),
                'type': 'POST',
                'dataType': 'json',
                'processData': false,
                'contentType': false,
            }).done( function( response ){
                $( '#add_check_modal .no-button' ).trigger( 'click' );
                $( target ).next().trigger( 'click' );
                up_modal();
            }).fail( function(){
                $( '#add_check_modal .no-button' ).trigger( 'click' );
                $( target ).next().next().trigger( 'click' );
                up_modal();
            });
        }
    });

    $( document ).on( 'click', '#edit_manager_modal .action-button', function () {
        if ( $( '#save_manager_form' ).parsley().validate() ) {
            $( '#edit_check_modal .yes-button' ).val( $( this ).val() );
            $( this ).next().trigger( 'click' );
            up_modal();
        }
    });
    $( document ).on( 'click', '#edit_check_modal .yes-button', function () {
        if ( $( this ).val() == 'manager' ) {
            var target = $( this );
            var form_data = new FormData();
            form_data.append( 'id', $( '#save_manager_form [name=id]' ).val() );
            form_data.append( 'family_name', $( '#save_manager_form [name=family_name]' ).val() );
            form_data.append( 'first_name', $( '#save_manager_form [name=first_name]' ).val() );
            form_data.append( 'family_name_kana', $( '#save_manager_form [name=family_name_kana]' ).val() );
            form_data.append( 'first_name_kana', $( '#save_manager_form [name=first_name_kana]' ).val() );
            $.ajax({
                'data': form_data,
                'url': $( '#save_manager_form' ).attr( 'action' ),
                'type': 'POST',
                'dataType': 'json',
                'processData': false,
                'contentType': false,
            }).done( function( response ){
                $( '#edit_check_modal .no-button' ).trigger( 'click' );
                $( target ).next().trigger( 'click' );
                up_modal();
            }).fail( function(){
                $( '#edit_check_modal .no-button' ).trigger( 'click' );
                $( target ).next().next().trigger( 'click' );
                up_modal();
            });
        }
    });

    $( document ).on( 'click', '.detail-manager-button', function () {
        var target = $( this );
        var form_data = new FormData();
        form_data.append( 'id', $( this ).next().val() );
        $.ajax({
            'data': form_data,
            'url': $( '#get_manager_url' ).val(),
            'type': 'POST',
            'dataType': 'json',
            'processData': false,
            'contentType': false,
        }).done( function( response ){
            $( '#detail_manager_modal #detail_manager_create_date' ).val( response.created_at );
            $( '#detail_manager_modal #detail_manager_id' ).val( response.display_id );
            $( '#detail_manager_modal #detail_manager_email' ).val( response.email );
            
            if ( response.profile != null && response.profile.family_name != null && response.profile.family_name != '' ) {
                $( '#detail_manager_modal #detail_manager_family_name' ).val( response.profile.family_name );
            } else {
                $( '#detail_manager_modal #detail_manager_family_name' ).val( '-' );
            }
            if ( response.profile != null && response.profile.first_name != null && response.profile.first_name != '' ) {
                $( '#detail_manager_modal #detail_manager_first_name' ).val( response.profile.first_name );
            } else {
                $( '#detail_manager_modal #detail_manager_first_name' ).val( '-' );
            }
            if ( response.profile != null && response.profile.family_name_kana != null && response.profile.family_name_kana != '' ) {
                $( '#detail_manager_modal #detail_manager_family_name_kana' ).val( response.profile.family_name_kana );
            } else {
                $( '#detail_manager_modal #detail_manager_family_name_kana' ).val( '-' );
            }
            if ( response.profile != null && response.profile.first_name_kana != null && response.profile.first_name_kana != '' ) {
                $( '#detail_manager_modal #detail_manager_first_name_kana' ).val( response.profile.first_name_kana );
            } else {
                $( '#detail_manager_modal #detail_manager_first_name_kana' ).val( '-' );
            }

            $( '#detail_manager_modal .reset-button' ).val( response.display_id );
            $( target ).next().trigger( 'click' );
        }).fail( function(){
            
        });
    });

    $( document ).on( 'click', '.delete-button', function () {
        $( '#delete_check_modal .yes-button' ).val( $( this ).val() );
        $( this ).next().trigger( 'click' );
    });
    $( document ).on( 'click', '.delete-manager-button', function () {
        $( '#delete_check_modal .yes-button' ).val( $( this ).val() );
        $( '#delete_manager_form [name=id]' ).val( $( this ).next().val() );
        $( this ).next().trigger( 'click' );
    });
    $( document ).on( 'click', '#delete_check_modal .yes-button', function () {
        if ( $( this ).val() == 'manager' ) {
            var target = $( this );
            var form_data = new FormData();
            form_data.append( 'id', $( '#save_manager_form [name=id]' ).val() );
            form_data.append( 'logout_flg', true );
            $.ajax({
                'data': form_data,
                'url': $( '#delete_manager_url' ).val(),
                'type': 'POST',
                'dataType': 'json',
                'processData': false,
                'contentType': false,
            }).done( function( response ){
                $( '#delete_check_modal .no-button' ).trigger( 'click' );
                $( target ).next().trigger( 'click' );
                up_modal();
            }).fail( function(){
                $( '#delete_check_modal .no-button' ).trigger( 'click' );
                $( target ).next().next().trigger( 'click' );
                up_modal();
            });
        } else if ( $( this ).val() == 'manager_item' ) {
            var target = $( this );
            var form_data = new FormData();
            form_data.append( 'id', $( '#delete_manager_form [name=id]' ).val() );
            form_data.append( 'logout_flg', false );
            $.ajax({
                'data': form_data,
                'url': $( '#delete_manager_form' ).attr( 'action' ),
                'type': 'POST',
                'dataType': 'json',
                'processData': false,
                'contentType': false,
            }).done( function( response ){
                $( '#delete_check_modal .no-button' ).trigger( 'click' );
                $( target ).next().trigger( 'click' );
                up_modal();
            }).fail( function(){
                $( '#delete_check_modal .no-button' ).trigger( 'click' );
                $( target ).next().next().trigger( 'click' );
                up_modal();
            });
        }
    });
    
    if ( $( '#change_email_form' ).length ) {
        $( '#change_email_form' ).parsley();
        $( '#change_email_form' ).parsley().options.requiredMessage = "入力してください";
        $( '#change_email_form' ).parsley().options.typeMessage = "正しい形式で入力してください";
    }
    if ( $( '#change_password_form' ).length ) {
        $( '#change_password_form' ).parsley();
        $( '#change_password_form' ).parsley().options.requiredMessage = "入力してください";
        $( '#change_password_form' ).parsley().options.equaltoMessage = "パスワードが一致していません";
        $( '#change_password_form' ).parsley().options.minlengthMessage = "8文字以上で入力してください";
    }
    if ( $( '#add_manager_form' ).length ) {
        $( '#add_manager_form' ).parsley();
        $( '#add_manager_form' ).parsley().options.requiredMessage = "入力してください";
        $( '#add_manager_form' ).parsley().options.typeMessage = "正しい形式で入力してください";
    }
    if ( $( '#save_manager_form' ).length ) {
        $( '#save_manager_form' ).parsley();
        $( '#save_manager_form' ).parsley().options.requiredMessage = "入力してください";
    }
});