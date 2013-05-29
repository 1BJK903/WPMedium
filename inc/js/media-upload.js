jQuery(document).ready(function($) {
    
    if ( !$('.theme_options').length > 0 )
        return false;
    
    var wpmedium_media_upload = function(target) {
        $('#upload_'+target+'_button').click(function(e) {
            targetfield = $(this).prev('input').prop('id');
            wp.media.editor.open();
            e.preventDefault();
        });
        
        $('#delete_'+target+'_button').click(function(e) {
            $('#'+target+'').val('');
            $('#upload_'+target+'_preview').find('img').remove();
            $(this).hide();
        });
    };
    
    var send_attachment_backup = wp.media.editor.send.attachment;
    wp.media.editor.send.attachment = function(props, attachment) {
        $('input#'+targetfield+'').val(attachment.url);
        
        $('#delete_'+targetfield+'_button').show();
        if ( $('#upload_'+targetfield+'_preview img').length > 0 )
            $('#upload_'+targetfield+'_preview img').attr('src', attachment.url);
        else
            $('#upload_'+targetfield+'_preview').html('<img style="max-width:200px;" src="'+attachment.url+'" />');
        $('#submit_general_options').trigger('click');
        
        wp.media.editor.send.attachment = send_attachment_backup;
        wp.media.editor.remove();
    }
    
    if ( $('#upload_site_logo_button').length > 0 )
        wpmedium_media_upload('site_logo');
    
    if ( $('#upload_W_image_button').length > 0 )
        wpmedium_media_upload('W_image');
    
    if ( $('#upload_post_thumbnail_button').length > 0 )
        wpmedium_media_upload('post_thumbnail');
    
    if ( $('#upload_taxonomy_image').length > 0 ) {
    
        $('#upload_taxonomy_image').click(function(e) {
            targetfield = $(this).prev('.image_url');
            tb_show('Mediacenter', 'media-upload.php?referer=wpmedium_taxonomy_image&type=image&TB_iframe=true&post_id=0', false);
            e.preventDefault();
        });
        
        $('#delete_taxonomy_image').click(function(e) {
            $('input#wpmedium_taxonomy_image').val('');
            $('#upload_taxonomy_image_preview img').remove();
            $(this).hide();
        });
        
        var send_attachment_backup = wp.media.editor.send.attachment;
            wp.media.editor.send.attachment = function(props, attachment) {
             
            $('input#wpmedium_taxonomy_image').val(attachment.url);  
            wp.media.editor.remove();
            $('#delete_taxonomy_image').show();
            if ( $('#upload_taxonomy_image_preview img').length > 0 )
                $('#upload_taxonomy_image_preview img').attr('src', attachment.url);
            else
                $('#upload_taxonomy_image_preview').html('<img style="max-width:100%;" src="'+attachment.url+'" />');
            
            wp.media.editor.send.attachment = send_attachment_backup;
            wp.media.editor.remove();
        }
    }
    
    $('.theme_options_menu a').click(function(e) {
        id = this.id.replace('__','');
        $('.theme_options_panel').removeClass('active');
        $('#'+id).addClass('active');
        $('.theme_options_menu a').removeClass('active');
        $(this).addClass('active');
        e.preventDefault();
    });
    
    $('.theme-panel-submit').click(function(e) {
        id = this.id.replace('submit_','');
        referer = $('#'+id).find('input[name=_wp_http_referer]');
        referer.val(referer.prop('value')+'&tab='+id);
    });
    
    $('#header_overlay_opacity').change(function() {
        update_color();
    });
    
    $('#header_overlay_opacity').keyup(function() {
        val = $(this).val();
        if ( val >= 0 && val <= 100 ) {
            $('#slider-range-max').slider({value: val});
            update_color();
        }
        else if ( val < 0 ) {
            $('#slider-range-max').slider({value: 0});
            $(this).val('0');
            update_color();
        }
        else if ( val > 100 ) {
            $('#slider-range-max').slider({value: 100});
            $(this).val('100');
            update_color();
        }
    });
    
});

function hex2rgb( colour ) {
    var r,g,b;
    if ( colour.charAt(0) == '#' )
        colour = colour.substr(1);

    r = colour.charAt(0)+''+colour.charAt(1);
    g = colour.charAt(2)+''+colour.charAt(3);
    b = colour.charAt(4)+''+colour.charAt(5);

    r = parseInt( r, 16 );
    g = parseInt( g, 16 );
    b = parseInt( b, 16 );
    
    return 'rgb('+r+','+g+','+b+')';
}

function hex2rgba( colour, opacity ) {
    return hex2rgb(colour).replace('rgb', 'rgba').replace(')', ','+opacity+')');
}

function update_color() {
    val = jQuery('#header_overlay_opacity').val();
    if ( jQuery('#header_overlay_color').val() != '' )
        jQuery('#slider-range-max').css({backgroundColor: hex2rgba(jQuery('#header_overlay_color').val(), (val/100))});
    else
        jQuery('#slider-range-max').css({backgroundColor: hex2rgba('#000000', (val/100))});
}